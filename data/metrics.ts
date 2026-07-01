import type { L10n } from "@/lib/i18n/types";

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: L10n;
};

/** Số liệu tác động rút ra từ CV — chỉnh cho khớp thực tế nếu cần. */
export const metrics: Metric[] = [
  {
    value: 400,
    suffix: "/tick",
    label: {
      vi: "đơn xử lý mỗi nhịp scheduler",
      en: "orders per scheduler tick",
    },
  },
  {
    value: 40,
    suffix: "%",
    label: { vi: "phản hồi nhanh hơn", en: "faster responses" },
  },
  {
    value: 100,
    suffix: "k+",
    label: { vi: "sản phẩm đã crawl", en: "products crawled" },
  },
  {
    value: 101,
    label: { vi: "models PostgreSQL", en: "PostgreSQL models" },
  },
];
