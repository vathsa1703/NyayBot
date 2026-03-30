// ============================================================
// server/rag/embedder.js
// ONE JOB: Convert text into vectors using Groq embeddings
// ============================================================
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const embedText = async (text) => {
  const response = await groq.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });

  return response.data[0].embedding;
};