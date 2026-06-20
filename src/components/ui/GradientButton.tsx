type GradientButtonProps = {
  text: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
};

export default function GradientButton({
  text,
  width = "w-full sm:w-[100px]",
  height = "h-[40px] sm:h-[44px]",
  onClick,
  className = "",
  textClassName = "text-sm sm:text-[16px] font-semibold whitespace-nowrap",
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group ${width} ${height} p-[1px] rounded-lg bg-gradient-to-r from-[#FEC12D] to-[#FF552C] ${className}`}
    >
      <span className="flex items-center justify-center w-full h-full bg-white rounded-lg px-3 sm:px-0 group-hover:bg-transparent transition-all duration-300">
        <span
          className={`bg-gradient-to-r from-[#FEC12D] to-[#FF552C] bg-clip-text text-transparent group-hover:text-white group-hover:bg-none transition-all duration-300 ${textClassName}`}
        >
          {text}
        </span>
      </span>
    </button>
  );
}
