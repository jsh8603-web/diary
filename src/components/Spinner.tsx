interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

export default function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div
      className={`${sizeMap[size]} border-baby-taupe border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="로딩 중"
    />
  );
}
