"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { getRelativeTime, getYoutubeEmbedUrl } from "@/lib/utils";
import { useState } from "react";

const platformColors = {
  instagram: "bg-gradient-to-r from-purple-600 to-pink-500",
  youtube: "bg-red-600",
  twitter: "bg-blue-500",
  other: "bg-gray-600",
};

const platformIcons = {
  instagram: "📷",
  youtube: "▶️",
  twitter: "𝕏",
  other: "🔗",
};

export default function VideoCard({
  title,
  description,
  thumbnail,
  platform = "other",
  category,
  url,
  date,
  className,
}) {
  const [showVideo, setShowVideo] = useState(false);
  const isYoutube = platform === "youtube";
  const embedUrl = isYoutube ? getYoutubeEmbedUrl(url) : null;

  const handleClick = () => {
    if (isYoutube) {
      setShowVideo(true);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div
        className={cn(
          "glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-accent-gold/30",
          className
        )}
        onClick={handleClick}
      >
        <div className="relative aspect-video bg-surface-light overflow-hidden">
          {thumbnail && thumbnail.length > 4 ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface to-surface-light flex items-center justify-center">
              <span className="text-4xl">{platformIcons[platform]}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-accent-gold/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-black ml-1" fill="black" />
            </div>
          </div>
          <span
            className={cn(
              "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white",
              platformColors[platform]
            )}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </span>
        </div>
        <div className="p-4">
          {category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-accent-gold border border-accent-gold/30 mb-3">
              {category}
            </span>
          )}
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{platformIcons[platform]} {platform}</span>
            <span>{date ? getRelativeTime(date) : ""}</span>
          </div>
        </div>
      </div>

      {showVideo && embedUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={`${embedUrl}?autoplay=1`}
              className="w-full h-full rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl hover:text-accent-gold"
            onClick={() => setShowVideo(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}