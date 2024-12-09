import { model } from '@/ai/model';
import { tools } from '@/ai/tools';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, tone } = await req.json();

  const result = streamText({
    model: model,
    system: `You are a helpful assistant build for having conversation about news in tone: "${tone}"`,
    messages,
    tools
  });

  return result.toDataStreamResponse();
}