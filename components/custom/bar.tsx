"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "buildTime", visitors: 275, fill: "var(--color-buildTime)" },
  { browser: "userExp", visitors: 200, fill: "var(--color-userExp)" },
  { browser: "devExp", visitors: 187, fill: "var(--color-devExp)" },
  { browser: "speed", visitors: 173, fill: "var(--color-speed)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  buildTime: {
    label: "Build Time",
    color: "hsl(var(--chart-1))",
  },
  userExp: {
    label: "UX",
    color: "hsl(var(--chart-2))",
  },
  devExp: {
    label: "DX",
    color: "hsl(var(--chart-3))",
  },
  speed: {
    label: "Speed",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function BarChartSpeed() {
  return (
        <ChartContainer config={chartConfig} className="h-[120px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
            className="font-sans"
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="visitors" type="number" hide />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
  )
}
