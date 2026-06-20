"use client";

import { Phone, Send, Camera } from "lucide-react";

interface ChatBotPanelProps {
  booking: any;
  onClose: () => void;
}

const ChatBotPanel: React.FC<ChatBotPanelProps> = ({ booking, onClose }) => {
  return (
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-4 min-h-[650px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50  px-4 py-2 rounded-2xl border-b">
        <div className="flex items-center gap-3 ">
          <img
            src={"/pro.jpg"}
            alt="agent"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Aadam Gabriel
            </h3>
          </div>
        </div>

        <button className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {/* Chat body */}
      <div className="flex-1 py-5 space-y-6 overflow-y-auto">
        <div>
          <img
            src="/way.jpg"
            alt="shared"
            className="w-40 h-28 rounded-lg object-cover"
          />
          <p className="text-xs text-gray-500 mt-2">On my way!</p>
        </div>

        <div className="flex justify-end">
          <span className="bg-blue-500 text-white text-xs px-3 py-2 rounded-lg">
            Waiting
          </span>
        </div>

        <div>
          <p className="text-xs text-gray-600">I will be there within 20 min</p>
        </div>
      </div>

      {/* Input */}
      <div className="bg-gray-100 rounded-full px-3 py-2 flex items-center gap-2">
        <button type="button" className="text-blue-500">
          <Camera className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder="Thanks"
          className="flex-1 bg-transparent outline-none text-sm"
        />

        <button type="button" className="text-orange-500">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* <button
        onClick={onClose}
        className="mt-4 text-sm text-orange-500 font-medium"
      >
        Back to bookings
      </button> */}
    </div>
  );
};

export default ChatBotPanel;
