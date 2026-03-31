// ============================================================
// server/controllers/noticeController.js
// ONE JOB: Generate notice using Groq + RAG, save to MongoDB
// Features:
//   - JWT auth (req.user from middleware)
//   - Free limit: 1 free notice, then ₹99
//   - Order ID required
//   - Clean output (no AI disclaimers in notice)
// ============================================================

import Groq from "groq-sdk";
import Notice from "../Models/notice.js";
import User from "../Models/User.js";
import { SYSTEM_PROMPTS } from "../Prompts/legalPrompts.js";

// ─── RAG: keyword-based retrieval ────────────────────────────
import { LAW_CHUNKS } from "../rag/chunks.js";

const retrieveRelevantLaws = (complaintText, complaintType, topK = 5) => {
  const query = `${complaintText} ${complaintType}`.toLowerCase();

  const scored = LAW_CHUNKS.map(chunk => {
    const score = chunk.keywords.filter(kw => query.includes(kw.toLowerCase())).length;
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(s => s.chunk).filter(c => c !== undefined);
};

const formatLawsForPrompt = (laws) => {
  if (!laws || laws.length === 0) return "";
  return `
RELEVANT LEGAL PROVISIONS — cite ONLY these sections, do not invent any others:
${laws.map(law => `[${law.source} — ${law.section}]: ${law.title}
${law.text}`).join("\n\n---\n\n")}
`.trim();
};

// ─── Clean AI disclaimer from output ─────────────────────────
const cleanNoticeOutput = (text) => {
  return text
    .replace(/this is an? (AI|ai)[\s-]*generated.*/gi, "")
    .replace(/not (legal )?advice.*/gi, "")
    .replace(/please (consult|have).*(advocate|lawyer|legal professional).*/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// ─── Generate Notice ─────────────────────────────────────────
export const generateNotice = async (req, res) => {
  const {
    complainantName,
    complainantAddress,
    complainantPhone,
    complainantEmail,
    oppositeParty,
    oppositePartyAddress,
    complaintType,
    complaintDetails,
    orderId,          // ← NEW: required
    amount,
    incidentDate,
    language,
  } = req.body;

  // ── 1. Validate orderId ──
  if (!orderId || !orderId.trim()) {
    return res.status(400).json({ error: "Order ID / Booking ID is required." });
  }

  // ── 2. Free limit check ──
  const user = await User.findById(req.user._id);
  if (!user.isPro && user.noticeCount >= 1) {
    return res.status(403).json({
      error: "Free limit reached. Please upgrade.",
      code: "FREE_LIMIT_REACHED",
    });
  }

  // ── 3. Retrieve relevant laws via keyword RAG ──
  const relevantLaws = retrieveRelevantLaws(complaintDetails, complaintType);
  const lawsContext = formatLawsForPrompt(relevantLaws);

  const userPrompt = `Generate a legal notice with the following details:

COMPLAINANT:
- Name: ${complainantName}
- Address: ${complainantAddress || "Not provided"}
- Phone: ${complainantPhone}
- Email: ${complainantEmail || "Not provided"}

OPPOSITE PARTY:
- Name: ${oppositeParty}
- Address: ${oppositePartyAddress || "Not provided"}

COMPLAINT TYPE: ${complaintType}
ORDER ID / BOOKING ID: ${orderId}
INCIDENT DATE: ${incidentDate || "Not specified"}
AMOUNT INVOLVED: Rs.${amount || "Not specified"}

COMPLAINT DETAILS:
${complaintDetails}

${lawsContext}

IMPORTANT INSTRUCTIONS:
1. Include "The transaction bearing Order ID ${orderId}" in the notice body
2. Cite ONLY the legal sections provided above
3. Do NOT include any AI disclaimer or "not legal advice" statement in the output
4. Output ONLY the legal notice text — nothing else
5. End with "Yours faithfully," and the complainant name
6. Add footer: "This notice is sent without prejudice to any other legal rights and remedies available."`;

  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 3000,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.english,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    let noticeText = completion.choices[0].message.content;

    // ── 4. Clean output ──
    noticeText = cleanNoticeOutput(noticeText);

    // ── 5. Save to MongoDB ──
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const noticeId = `NYB-${year}-${random}`;

    const notice = new Notice({
      complainantName,
      complainantPhone,
      complainantEmail,
      complainantAddress,
      oppositeParty,
      oppositePartyAddress,
      complaintType,
      complaintDetails,
      amount,
      incidentDate,
      language,
      noticeId,
      generatedNotice: noticeText,
    });

    await notice.save();

    // ── 6. Increment user noticeCount ──
    await User.findByIdAndUpdate(req.user._id, { $inc: { noticeCount: 1 } });

    console.log(`✅ Notice saved: ${noticeId} | User: ${user.email} | Count: ${user.noticeCount + 1}`);

    res.status(201).json({
      success: true,
      noticeId,
      notice: noticeText,
    });

  } catch (err) {
    console.error("Notice Generation Error:", err);
    res.status(500).json({ error: "Failed to generate notice. Please try again." });
  }
};

// ─── Get Notice by ID ─────────────────────────────────────────
export const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findOne({ noticeId: req.params.id });
    if (!notice) return res.status(404).json({ error: "Notice not found." });
    res.json({ success: true, notice });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notice." });
  }
};
