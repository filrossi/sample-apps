import { getContext } from "./context";

export async function createPrompt(messages: any[], namespaceId: string) {
  try {
    // Get the last message
    const lastMessage = messages[messages.length - 1]["content"];

    // Get the context from the last message
    const context = await getContext(lastMessage, namespaceId);

    const prompt = [
      {
        role: "system",
        content: `You are an AI assistant specialized in Dutch building regulation and sustainability. You provide precise, context-aware guidance based on the provided CONTEXT BLOCK. 
      DO NOT SHARE REFERENCE URLS THAT ARE NOT INCLUDED IN THE CONTEXT BLOCK.
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      If user asks about or refers to the current "workspace" AI will refer to the the content after START CONTEXT BLOCK and before END OF CONTEXT BLOCK as the CONTEXT BLOCK. 
      If AI sees a REFERENCE URL in the provided CONTEXT BLOCK, please use reference that URL in your response as a link reference right next to the relevant information in a numbered link format e.g. ([reference number])
      If link is a pdf and you are CERTAIN of the page number, please include the page number in the pdf href (e.g. .pdf#page=x ).
      If AI is asked to give quotes, please bias towards providing reference links to the original source of the quote.
      AI assistant will not invent anything that is not drawn directly from the context.  
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      `,
      },
    ];
    return { prompt };
  } catch (e) {
    throw e;
  }
}
