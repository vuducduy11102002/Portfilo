"use client";

import Image from "next/image";
import { useState } from "react";
import { getInitials } from "@/lib/initials";

type HeroAvatarProps = {
  src?: string;
  name: string;
};

/** Avatar hero: ảnh thật nếu có `src`, không thì hiện monogram. Ring gradient + glow.
 *  Ảnh được zoom nhẹ vào giữa để khung khuôn mặt gọn (headshot). */
export function HeroAvatar({ src, name }: HeroAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="relative inline-block">
      {/* glow gradient phía sau */}
      <div
        aria-hidden
        className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-accent via-accent-2 to-accent-3 opacity-50 blur-md"
      />
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-background">
        {showImage ? (
          <Image
            src={src as string}
            alt={name}
            width={120}
            height={120}
            priority
            onError={() => setFailed(true)}
            className="h-full w-full scale-[1.3] object-cover object-[center_30%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent-muted">
            <span className="text-gradient text-3xl font-bold">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
