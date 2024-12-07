"use client";

import { useChat } from "ai/react";
import Image from "next/image";

export default function Page() {
	const { messages, input, setInput, handleSubmit } = useChat();

	return (
		<div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
			{messages.map((message) => (
				<div key={message.id} className="p-2 border-b border-gray-200">
					<div className="font-semibold">{message.role}</div>
					<div>{message.content}</div>

					<div className="mt-2">
						{message.toolInvocations?.map((toolInvocation) => {
							const { toolName, toolCallId, state } = toolInvocation;

							if (state === "result") {
								if (toolName === "generateMeme") {
									const { result } = toolInvocation;
									return (
										<div
											key={toolCallId}
											className="mt-1 p-2 bg-gray-100 rounded"
										>
											<img src={result.url} alt="img" />
										</div>
									);
								}
								if (toolName === "generateVideo") {
									const { result } = toolInvocation;
									return (
										<div
											key={toolCallId}
											className="mt-1 p-2 bg-gray-100 rounded"
										>
											<video controls>
												<source src={result.url} type="video/mp4" />
												<track
													kind="captions"
													srcLang="en"
													src={result.captionsUrl}
													label="English captions"
												/>
											</video>
										</div>
									);
								}
							} else {
								return (
									<div
										key={toolCallId}
										className="mt-1 p-2 bg-gray-100 rounded"
									>
										<div>Loading...</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			))}

			<form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
				<input
					type="text"
					value={input}
					onChange={(event) => {
						setInput(event.target.value);
					}}
					className="flex-1 p-2 border border-gray-300 rounded"
				/>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					Send
				</button>
			</form>
		</div>
	);
}
