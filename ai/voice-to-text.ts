import Groq from "groq-sdk";

export function base64ToFile(base64Data: string, fileName: string) {
	const binaryData = atob(base64Data);
	const arrayBuffer = new ArrayBuffer(binaryData.length);
	const uint8Array = new Uint8Array(arrayBuffer);

	for (let i = 0; i < binaryData.length; i++) {
		uint8Array[i] = binaryData.charCodeAt(i);
	}

	const blob = new Blob([uint8Array], { type: "audio/ogg" });
	return new File([blob], fileName, { type: "audio/ogg" });
}

export const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

export async function getTranscript(input: string) {
	const audioFile = base64ToFile(input, "audio.ogg");
	try {
		const { text } = await groq.audio.transcriptions.create({
			file: audioFile,
			model: "whisper-large-v3",
		});

		return text.trim() || null;
	} catch {
		return null; // Empty audio file
	}
}
