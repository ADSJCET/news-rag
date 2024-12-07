import { cn } from "@/lib/utils";

export const ShinyBg = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen",
                "transform-gpu [filter:blur(140px)] [background-image:radial-gradient(ellipse_at_center,#f472b6,transparent_35%)] dark:[background-image:radial-gradient(ellipse_at_center,#f472b6,transparent_35%)]",
                className
            )}
        />
    );
}