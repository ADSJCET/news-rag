import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: any;
  height?: any;
  x?: any;
  y?: any;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: any;
  mask?:boolean
  className?: string;
  [key: string]: any;
}

export function GridPattern({
  width = 60,
  height = 60,
  x = -1,
  y = -1,
  mask = false,
  strokeDasharray = "4 2",
  squares,
  className,
  ...props
}: GridPatternProps) {

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 translate-x-5 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        mask ? "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" : "",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
        id="grid"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${"grid"})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

export default GridPattern;
