type Props = {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit";
  className?: string;
};

export default function GradientButton2({
  text,
  onClick,
  width = "w-full",
  height = "h-[44px] sm:h-[48px]",
  type = "button",
  className = "",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${width} ${height}
        px-4 md:px-6
        text-sm md:text-base
        rounded-full
        bg-gradient-to-r from-[#FF512F] to-[#F09819]
        text-white font-medium
        shadow-lg
        flex items-center justify-center
        whitespace-nowrap
        transition hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      {text}
    </button>
  );
}
