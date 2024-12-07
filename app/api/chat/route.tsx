import { tools } from '@/ai/tools';
import { groq } from '@/lib/model';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system: 'You are a helpful assistant.',
    messages,
    tools
  });

  return result.toDataStreamResponse();
}