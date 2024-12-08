import { env } from "@/env";
import { triedAsync } from "@/lib/utils";
import { ElevenLabsClient, play } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
	apiKey: env.ELEVENLABS_API_KEY
});

export const getVoice = async (text: string) => {
	return await triedAsync(
		elevenlabs.generate({
			voice: "Sarah",
			text,
			model_id: "eleven_multilingual_v2",
		}),
	);
};

const {data, error, isSuccess} = await getVoice("Hello, world!");

isSuccess && console.log(data);
// isSuccess && await play(data);
