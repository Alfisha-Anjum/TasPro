"use client";

import { Switch } from "@/components/ui/switch";

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  subtitle?: string;
  disabled?: boolean;
}

export const ToggleSwitch = ({
  checked,
  onCheckedChange,
  label,
  subtitle,
  disabled = false,
}: ToggleSwitchProps) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{label}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-gray-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};