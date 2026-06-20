interface ToggleProps {
  icon: React.ReactNode;
  text: string;
  state: boolean;
  setState: (value: boolean) => void;
}

export default function Toggle({ icon, text, state, setState }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 group-hover:bg-orange-100 transition">
          {icon}
        </div>

        <span className="text-[14px] md:text-[16px] font-medium text-[#1B1B1B] dark:text-gray-200 group-hover:text-orange-500 transition">
          {text}
        </span>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={() => setState(!state)}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
          state ? "bg-gradient-to-r from-[#FEC12D] to-[#FF552C]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            state ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
}
