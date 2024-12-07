import Balance from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Announcement } from "./announcement";

function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn(
				"mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 lg:py-24 md:py-12 lg:pb-20 md:pb-8",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}

function PageHeaderHeading({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1
			className={cn(
				"text-center font-bold text-3xl leading-tight tracking-tight md:text-5xl lg:leading-[1.1]",
				"cal-sans",
				className,
			)}
			{...props}
		/>
	);
}

function PageHeaderDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<Balance
			className={cn(
				"max-w-[750px] text-center font-light text-foreground text-lg md:text-2xl xl:text-3xl",
				"cal-sans",
				className,
			)}
			{...props}
		/>
	);
}

function PageActions({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex w-full items-center justify-center space-x-4 py-4 md:pb-10",
				className,
			)}
			{...props}
		/>
	);
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading };

export default function PageProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<PageHeader className="!p-0">
				<Announcement />

				<Image src="/luttapi-black.png" className="mt-8" alt="Logo of LuttAPI" width={100} height={100} />
				{/* <Image src="/luttapi-white.png" className="mt-8 hidden dark:block" alt="Logo of LuttAPI" width={100} height={100} /> */}

				<PageHeaderHeading className="md:text-7xl">
					Lutt
					<span className="bg-gradient-to-tl from-violet-400 via-pink-400 to-orange-200 bg-clip-text text-transparent">
						API
					</span>
				</PageHeaderHeading>
				<PageHeaderHeading className="opacity-60">
					Open Source Alternative to
					Claude Artifact
					{/* <br /> */}
					{/* <span className="font-mono font-bold text-6xl">v0</span> */}
					{/* &nbsp;&  */}
				</PageHeaderHeading>
				<PageHeaderDescription className="opacity-60">
					Instantly Generate & Deploy UI from any Source of Data
				</PageHeaderDescription>
			</PageHeader>
			{children}
			{/* <PageHeader className="!p-0">
				<PageHeaderDescription className="font-sans font-semibold">
					why do we need an api testing platform
					<br />if you can instantly generate and deploy frontend from backend url?
				</PageHeaderDescription>
			</PageHeader> */}
		</>
	);
}
