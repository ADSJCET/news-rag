import { env } from "@/env";
import { triedAsync } from "@/lib/utils";
import { ElevenLabsClient, play } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
	apiKey: env.ELEVENLABS_API_KEY
});

export const getVoice = async (text: string) => {
	const { data, error, isSuccess } = await triedAsync(
		elevenlabs.generate({
			voice: "Sarah",
			text,
			model_id: "eleven_multilingual_v2",
		}),
	);
};

// const audio = await play(audio);
