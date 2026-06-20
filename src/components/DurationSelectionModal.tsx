import { useEffect, useState } from "react";
import { X, Clock, Check } from "lucide-react";

interface DurationSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (duration: string) => void;
  title?: string;
  durations?: { value: string; label: string; description?: string }[];
}

const DurationSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  title = "Select Duration", 
  durations = [
    { value: "30-minutes", label: "30 Minutes", description: "Quick service" },
    { value: "1-hour", label: "1 Hour", description: "Standard service" },
    { value: "2-hours", label: "2 Hours", description: "Extended service" },
    { value: "half-day", label: "Half Day", description: "Full morning/evening" },
    { value: "full-day", label: "Full Day", description: "Complete day service" }
  ]
}: DurationSelectionModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setSelectedDuration(null);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen && !isVisible) return null;

  const handleConfirm = () => {
    if (selectedDuration) {
      onSelect(selectedDuration);
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-transform duration-200 ${
          isVisible 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {durations.map((duration) => (
              <div
                key={duration.value}
                onClick={() => setSelectedDuration(duration.value)}
                className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedDuration === duration.value
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{duration.label}</div>
                    {duration.description && (
                      <div className="text-sm text-gray-600">{duration.description}</div>
                    )}
                  </div>
                  {selectedDuration === duration.value && (
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDuration}
              className={`px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                selectedDuration
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSelectionModal;