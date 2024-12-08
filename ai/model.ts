import { env } from "@/env";
import { createGroq } from "@ai-sdk/groq";

export const groq = createGroq({
	apiKey: env.GROQ_API_KEY,
});

export const model = groq('llama-3.1-8b-instant')