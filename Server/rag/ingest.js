// ============================================================
// server/rag/ingest.js
// ONE JOB: One-time script to embed all law chunks and store in MongoDB
// Run: node server/rag/ingest.js
// Only needs to run ONCE — or when you add new laws
// ============================================================

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { embedText } from "./embedder.js";
import { LAW_CHUNKS } from "./chunks.js";

// ── Connect to MongoDB ──
await mongoose.connect(process.env.MONGODB_URI);
console.log("✅ MongoDB Connected");

// ── Define LawChunk Schema ──
const lawChunkSchema = new mongoose.Schema({
  id:        { type: String, unique: true },
  source:    String,
  section:   String,
  title:     String,
  text:      String,
  keywords:  [String],
  embedding: [Number], // the vector
}, { timestamps: true });

const LawChunk = mongoose.model("LawChunk", lawChunkSchema);

// ── Clear existing chunks ──
await LawChunk.deleteMany({});
console.log("🗑️  Cleared existing law chunks");

// ── Embed and store each chunk ──
console.log(`📚 Processing ${LAW_CHUNKS.length} law chunks...`);

for (const chunk of LAW_CHUNKS) {
  try {
    // Combine title + text for better embedding
    const textToEmbed = `${chunk.title}: ${chunk.text}`;
    const embedding = await embedText(textToEmbed);

    await LawChunk.create({
      ...chunk,
      embedding,
    });

    console.log(`✅ Embedded: ${chunk.section} — ${chunk.title}`);

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 500));

  } catch (err) {
    console.error(`❌ Failed: ${chunk.section}`, err.message);
  }
}

console.log("🎉 All law chunks ingested successfully!");
console.log("You can now use RAG in your notice generation.");
await mongoose.disconnect();
process.exit(0);
