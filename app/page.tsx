"use client";

import type { GetToolResult } from "@/ai/tools";
import { useChat } from "ai/react";

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
									const { result } = toolInvocation as {
										result: GetToolResult<"generateMeme">;
									};
									return (
										<div
											key={toolCallId}
											className="mt-1 p-2 bg-gray-100 rounded"
										>
											<div className="text-bold bg-white space-y-2">
												<p>{result.caption}</p>
												<img
													src={result.url}
													alt="img"
													className="w-full h-auto"
												/>
											</div>
										</div>
									);
								}
								if (toolName === "generateVideo") {
									const { result } = toolInvocation as {
										result: GetToolResult<"generateVideo">;
									};

									return (
										<div
											key={toolCallId}
											className="mt-1 p-2 bg-gray-100 rounded"
										>
											<video controls className="w-full h-auto">
												<source src={result.url} type="video/mp4" />
												<track
													kind="captions"
													srcLang="en"
													label="English captions"
												/>
											</video>
										</div>
									);
								}
								if (toolName === "searchNews") {
									const { result } = toolInvocation as {
										result: GetToolResult<"searchNews">;
									};

									if (!result.news || result.news.length === 0) {
										return (
											<div
												key={toolCallId}
												className="mt-1 p-2 bg-gray-100 rounded"
											>
												<div>No news found</div>
											</div>
										);
									}

									return (
										<div
											key={toolCallId}
											className="mt-1 p-2 bg-gray-100 rounded flex"
										>
											{result.news.map((news) => (
												<a
													key={news.url}
													href={news.url}
													target="_blank"
													rel="noreferrer"
													className="text-blue-500 border border-blue-500 rounded p-2 m-1"
												>
													<div className="font-semibold">{news.title}</div>
													{/* <div>{news.description}</div> */}
												</a>
											))}
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
