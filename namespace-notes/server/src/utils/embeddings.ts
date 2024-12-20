// embeddings.ts

import OpenAI from "openai";
import config from "../config";

/**
 * Embed a piece of text using an embedding model or service.
 *
 * @param chunks The text chunks to embed.
 * @returns The embedded representation of the text.
 */
export async function embedChunks(chunks: string[]): Promise<any> {
  const openai = new OpenAI({
    apiKey: config.openAiApiKey,
    organization: config.openAiOrganizationId,
  });

  try {
    console.log("Embedding the following chunks:", chunks); // Debug: Input text

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002", // Updated to a valid OpenAI model
      input: chunks,
    });

    console.log("Embedding response:", response.data); // Debug: API response
    return response.data;
  } catch (error) {
    console.error("Error embedding text with OpenAI:", error);
    throw error;
  }
}
