"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  timeZone: string;
  className?: string;
};

/** Đồng hồ live theo múi giờ chỉ định. Render placeholder tới khi mount để tránh lệch hydration. */
export function LiveClock({ timeZone, className }: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--:--"}
    </span>
  );
}
