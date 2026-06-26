"use client";

import LayoutContainer from "./LayoutContainer";

const getYoutubeEmbedUrl = (url: string) => {
  const shortsMatch = url.match(/shorts\/([^?]+)/);
  const watchMatch = url.match(/[?&]v=([^&]+)/);

  const videoId = shortsMatch?.[1] || watchMatch?.[1];

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function ServiceReels({ data = [] }: { data?: any[] }) {
  if (!data.length) return null;

  return (
    <section className="mx-auto sm:px-0  sm:py-0 py-5">
      <LayoutContainer className="relative">
        <h2 className="text-2xl font-bold text-gray-900">Service Reels</h2>
        <p className="text-gray-500 mb-5">Watch our experts in action</p>

        <div className="flex gap-5 overflow-x-auto hide-scrollbar">
          {data.map((reel) => (
            <div
              key={reel.id}
              className="min-w-[320px] h-[400px] rounded-[28px] overflow-hidden bg-black relative"
            >
              <iframe
                src={getYoutubeEmbedUrl(reel.videoUrl)}
                title={reel.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              <div className="absolute bottom-5 left-5 text-white font-bold text-lg pointer-events-none">
                {reel.title}
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </LayoutContainer>
    </section>
  );
}
