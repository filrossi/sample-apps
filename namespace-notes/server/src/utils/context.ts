import { ScoredPineconeRecord } from "@pinecone-database/pinecone";
import { Metadata, getMatchesFromEmbeddings } from "./pinecone";
import { embedChunks } from "./embeddings";

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string,
  namespace: string,
  maxCharacters = 10000,
  minScore = 0.05,
  getOnlyText = true
): Promise<string | ScoredPineconeRecord[]> => {
  try {
    console.log("Input Message:", message);
    console.log("Namespace:", namespace);
    console.log("Max Characters Allowed:", maxCharacters);
    console.log("Minimum Score Threshold:", minScore);

    // Wrap the message in an array before passing it to embedChunks
    const embeddings = await embedChunks([message]);
    console.log("Generated Embeddings:", embeddings);

    // Extract the embedding from the response
    const embedding = embeddings[0]?.embedding;
    if (!embedding) {
      console.error("No embedding generated for the input message.");
      throw new Error("Failed to generate embedding.");
    }
    console.log("Single Embedding Extracted:", embedding);

    // Get matches from Pinecone
    const matches = await getMatchesFromEmbeddings(embedding, 15, namespace);
    console.log("Matches from Pinecone:", matches);

    // Filter matches based on the score threshold
    const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);
    console.log("Qualifying Documents:", qualifyingDocs);

    if (!getOnlyText) {
      console.log("Returning raw matches.");
      return qualifyingDocs;
    }

    // Extract and deduplicate text from qualifying documents
    const documentTexts = qualifyingDocs.map((match) => {
      const metadata = match.metadata as Metadata;
      return `REFERENCE URL: ${metadata.referenceURL} CONTENT: ${metadata.text}`;
    });
    console.log("Extracted Texts from Qualifying Documents:", documentTexts);

    // Concatenate texts and truncate if necessary
    const concatenatedDocs = documentTexts.join(" ");
    const finalContext =
      concatenatedDocs.length > maxCharacters
        ? concatenatedDocs.substring(0, maxCharacters)
        : concatenatedDocs;
    console.log("Final Context (Truncated if Needed):", finalContext);

    return finalContext;
  } catch (error) {
    console.error("Failed to get context:", error);
    throw error;
  }
};

// Test the function and display the generated context in the console
(async () => {
  const message = "Your input message here"; // Replace with the actual input message
  const namespace = "your-namespace"; // Replace with your Pinecone namespace
  const maxCharacters = 5000; // Optional, customize as needed
  const minScore = 0.15; // Optional, customize as needed
  const getOnlyText = true; // Set to false if you want raw matches instead of concatenated text

  try {
    const context = await getContext(message, namespace, maxCharacters, minScore, getOnlyText);
    console.log("Generated Context:", context);
  } catch (error) {
    console.error("Error generating context:", error);
  }
})();
