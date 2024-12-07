"use client";

import { AnimatePresence, delay, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TextareaProps } from "@/components/ui/textarea";


export const PlaceholdersAndVanishInput = React.forwardRef<
	HTMLTextAreaElement,
	TextareaProps & {
		placeholders: string[];
		delay?: number;
		containerClassName?: TextareaProps["className"];
	}
>(
	(
		{
			className,
			placeholders,
			delay,
			containerClassName,
			onChange,
			...props
		},
		ref,
	) => {
		const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

		useEffect(() => {
			const startAnimation = () => {
				const interval = setInterval(() => {
					setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
				}, 1500);
				return () => clearInterval(interval);
			};

			startAnimation();
		}, [placeholders.length]);

		// const canvasRef = useRef<HTMLCanvasElement>(null);
		// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
		// const newDataRef = useRef<any[]>([]);
		const inputRef = useRef<HTMLTextAreaElement>(null);
		const [value, setValue] = useState("");
		const [animating, setAnimating] = useState(false);

		// const draw = useCallback(() => {
		// 	if (!inputRef.current) return;
		// 	const canvas = canvasRef.current;
		// 	if (!canvas) return;
		// 	const ctx = canvas.getContext("2d");
		// 	if (!ctx) return;

		// 	canvas.width = 800;
		// 	canvas.height = 800;
		// 	ctx.clearRect(0, 0, 800, 800);
		// 	const computedStyles = getComputedStyle(inputRef.current);

		// 	const fontSize = Number.parseFloat(
		// 		computedStyles.getPropertyValue("font-size"),
		// 	);
		// 	ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
		// 	ctx.fillStyle = "#FFF";
		// 	ctx.fillText(value, 16, 40);

		// 	const imageData = ctx.getImageData(0, 0, 800, 800);
		// 	const pixelData = imageData.data;
		// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		// 	const newData: any[] = [];

		// 	for (let t = 0; t < 800; t++) {
		// 		const i = 4 * t * 800;
		// 		for (let n = 0; n < 800; n++) {
		// 			const e = i + 4 * n;
		// 			if (
		// 				pixelData[e] !== 0 &&
		// 				pixelData[e + 1] !== 0 &&
		// 				pixelData[e + 2] !== 0
		// 			) {
		// 				newData.push({
		// 					x: n,
		// 					y: t,
		// 					color: [
		// 						pixelData[e],
		// 						pixelData[e + 1],
		// 						pixelData[e + 2],
		// 						pixelData[e + 3],
		// 					],
		// 				});
		// 			}
		// 		}
		// 	}

		// 	newDataRef.current = newData.map(({ x, y, color }) => ({
		// 		x,
		// 		y,
		// 		r: 1,
		// 		color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		// 	}));
		// }, [value]);

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		// useEffect(() => {
		// 	draw();
		// }, [value, draw]);

		return (
			<div
				className={cn(
					"relative flex w-full min-h-[16px] rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
					value && "bg-gray-50",
					containerClassName,
				)}
			>
				<textarea
					onChange={(e) => {
						if (!animating) {
							setValue(e.target.value);
							onChange?.(e);
						}
					}}
					ref={inputRef}
					value={value}
					className={cn(
						"w-full border-none bg-transparent focus:outline-none focus:ring-0",
						className,
					)}
					{...props}
				/>
				<div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
					<AnimatePresence mode="wait">
						{!value && (
							<motion.p
								initial={{
									y: 5,
									// opacity: 0,
								}}
								key={`current-placeholder-${currentPlaceholder}`}
								animate={{
									y: 0,
									// opacity: 1,
								}}
								exit={{
									y: -5,
									// opacity: 0,
								}}
								transition={{
									// duration: 1,
									
									// repeatDelay: delay ?? 0,
									ease: "linear",
								}}
								className="text-neutral-500 p-3 pt-1 text-left w-[calc(100%-2rem)] truncate"
							>
								{placeholders[currentPlaceholder]}
							</motion.p>
						)}
					</AnimatePresence>
				</div>
			</div>
		);
	},
);
PlaceholdersAndVanishInput.displayName = "PlaceholdersAndVanishInput";
