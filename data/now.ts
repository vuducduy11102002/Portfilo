import type { L10n } from "@/lib/i18n/types";

/** IANA timezone cho đồng hồ live ở section Now. */
export const NOW_TIMEZONE = "Asia/Ho_Chi_Minh";

type NowItem = { icon: "building" | "learning" | "exploring"; text: L10n };

/** TODO: cập nhật cho khớp thực tế của bạn — đây là phần "sống", nên làm mới thường xuyên. */
export const nowItems: NowItem[] = [
  {
    icon: "building",
    text: {
      vi: "Hệ thống quản lý sản xuất PodFactory tại iArt Holdings",
      en: "The PodFactory production management system at iArt Holdings",
    },
  },
  {
    icon: "learning",
    text: {
      vi: "Kiến trúc hệ phân tán & tối ưu PostgreSQL chuyên sâu",
      en: "Distributed systems architecture & deep PostgreSQL optimization",
    },
  },
  {
    icon: "exploring",
    text: {
      vi: "Event-driven architecture, Kafka và observability (OpenTelemetry)",
      en: "Event-driven architecture, Kafka and observability (OpenTelemetry)",
    },
  },
];
