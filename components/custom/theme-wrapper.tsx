"use client"

import { cn } from "@/lib/utils"
import { useConfig } from "@/components/theme/config"

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string
}

export function ThemeWrapper({
  defaultTheme,
  children,
  className,
}: ThemeWrapperProps) {
  const [config] = useConfig()

  return (
    <div
      className={cn(
        `theme-${config.theme}`,
        "w-full",
        className
      )}
      style={
        {
          "--radius": `${config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}