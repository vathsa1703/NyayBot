import { LAW_CHUNKS } from "./chunks.js";

// STEP 1: find relevant laws using keywords
export const retrieveRelevantLaws = (complaintText, topK = 5) => {
  const text = complaintText.toLowerCase();

  const scored = LAW_CHUNKS.map(chunk => {
    let score = 0;

    chunk.keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        score++;
      }
    });

    return { chunk, score };
  });

  // sort highest score first
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map(s => s.chunk);
};

// STEP 2: format laws for AI prompt
export const formatLawsForPrompt = (laws) => {
  if (!laws.length) return "";

  return `
Relevant Legal Provisions:
${laws.map((law, i) => `
${i + 1}. ${law.source} — ${law.section}
${law.title}

${law.text}
`).join("\n\n")}

Use ONLY the above sections when citing law.
Do NOT make up any section numbers.
`;
};