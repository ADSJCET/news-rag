import { env } from "@/env";

export interface StableDiffusionRequest {
	prompt: string;
}

export interface StableDiffusionResult {
	success: boolean;
	result: {
		images: string[];
	};
	errors: string[];
}

export async function generateImage(prompt: string) {
	const accountId = env.CLOUDFLARE_ACCOUNT_ID;
	const apiToken = env.CLOUDFLARE_API_TOKEN;

	const result = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt } as StableDiffusionRequest),
		},
	);

	console.log(result);

	if (!result.ok) {
		throw new Error(`HTTP error! status: ${result.status}`);
	}

	const imageBuffer = await result.arrayBuffer();
    const base64Image = `data:image/png;base64,${imageBuffer.toString()}`;

	return base64Image;

	// const imageBlob = await result.blob()

	// // return URL.createObjectURL(imageBlob);
	// return await blobToBase64(imageBlob) as string
}

function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}

console.log(await generateImage("A cat in a hat"));
