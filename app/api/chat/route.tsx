import { model } from '@/ai/model';
import { tools } from '@/ai/tools';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(JSON.stringify(messages))

  const result = streamText({
    model: model,
    system: 'You are a helpful assistant.',
    messages,
    tools
  });

  return result.toDataStreamResponse();
}