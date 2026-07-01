import type { L10n } from "@/lib/i18n/types";

type PrincipleIcon = "performance" | "architecture" | "reliability" | "automation";

export type Principle = {
  icon: PrincipleIcon;
  title: L10n;
  description: L10n;
};

export const principles: Principle[] = [
  {
    icon: "performance",
    title: { vi: "Hiệu năng là một tính năng", en: "Performance is a feature" },
    description: {
      vi: "Từ truy vấn tới render — đo lường, tìm nút thắt và tối ưu có mục tiêu.",
      en: "From query to render — measure, find the bottleneck, and optimize with intent.",
    },
  },
  {
    icon: "architecture",
    title: { vi: "Kiến trúc sạch, dễ mở rộng", en: "Clean, scalable architecture" },
    description: {
      vi: "Ranh giới rõ ràng, dữ liệu đúng chỗ, để hệ thống lớn lên mà không rối.",
      en: "Clear boundaries and the right data model, so systems grow without chaos.",
    },
  },
  {
    icon: "reliability",
    title: { vi: "Tin cậy & đúng đắn", en: "Reliability & correctness" },
    description: {
      vi: "Distributed lock, khử trùng lặp, idempotency — không để race condition lọt lưới.",
      en: "Distributed locks, deduplication, idempotency — no race condition slips through.",
    },
  },
  {
    icon: "automation",
    title: { vi: "Tự động hoá & trải nghiệm dev", en: "Automation & developer experience" },
    description: {
      vi: "CI/CD, tooling và quy ước tốt để đội ngũ đi nhanh mà vẫn an toàn.",
      en: "CI/CD, tooling and solid conventions so the team ships fast and safely.",
    },
  },
];
