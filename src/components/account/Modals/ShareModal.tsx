"use client";

import { Copy } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ShareModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  const shareLink =
    "https://www.figma.com/file/cSkqYkiSpzSXdwaiXd2FZj/Net-Card?type=design";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const people = Array(8).fill({
    name: "User Name",
    img: "/img/referimg.png",
  });

  const socials = [
    { name: "WhatsApp", icon: "/whatsapp.png" },
    { name: "Facebook", icon: "/facebook.png" },
    { name: "Twitter", icon: "/twitter.png" },
    { name: "Instagram", icon: "/instagram.png" },
    { name: "LinkedIn", icon: "/linkedin.png" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[92%] max-w-[520px] rounded-[40px] sm:rounded-[52px] p-5 sm:p-8 relative shadow-xl">
        {/* Close */}
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 flex justify-end items-center w-full">
          <button
            onClick={onClose}
            className="relative w-[50px] h-[50px] overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[30px] h-[30px] bg-white"></div>
            </div>
            <img
              src="/cancel.png"
              alt="cancel"
              className="absolute inset-0 w-full h-full"
            />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-center text-black font-semibold text-lg mb-4">
          Share
        </h2>

        {/* Link Box */}
        <div className="flex items-center justify-between border rounded-xl px-3 py-2 mb-5">
          <span className="text-black text-xs sm:text-sm w-[70%] sm:w-[80%] break-words line-clamp-2">
            {shareLink}
          </span>
          <div className="flex flex-col items-center justify-center min-w-[50px]">
            <Copy
              size={30}
              onClick={copyToClipboard}
              className="cursor-pointer text-gray-900 rotate-180 hover:text-black"
            />
            <span className="text-[16px] text-gray-900 mt-1">Copy</span>
          </div>
        </div>

        {/* People (Perfect 4 per row, tight spacing) */}
        <div className="flex flex-wrap mb-5 gap-4 sm:gap-6 justify-center">
          {people.map((p, i) => (
            <div key={i} className=" flex flex-col items-center mb-4">
              <img
                src={p.img}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                alt={p.name}
              />
              <p className="mt-1 text-[13px] sm:text-[15px] text-black text-center leading-tight px-1">
                {p.name}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#E1E1E1] my-[25px] shadow-sm" />

        {/* Social Icons */}
        <div className="flex justify-between px-1 sm:px-2 gap-2">
          {socials.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-[55px] sm:w-[60px]"
            >
              <img src={s.icon} className="w-11 h-11" alt={s.name} />
              <p className="mt-1 text-xs text-black">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
