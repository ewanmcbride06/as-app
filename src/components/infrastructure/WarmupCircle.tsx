interface WarmupCircleProps {
  percent: number;
  size?: number;
}

const WarmupCircle = ({ percent, size = 28 }: WarmupCircleProps) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const color =
    percent >= 95
      ? "hsl(142 71% 45%)"   // green
      : percent >= 80
        ? "hsl(32 95% 54%)"  // orange
        : "hsl(0 72% 51%)";  // red

  const trackColor = "hsl(var(--muted))";

  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} className="shrink-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <span className="text-sm text-muted-foreground">{percent}%</span>
    </div>
  );
};

export default WarmupCircle;
