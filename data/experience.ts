import type { L10n } from "@/lib/i18n/types";

export type ExperienceItem = {
  role: L10n;
  company: L10n;
  period: L10n;
  description: L10n;
  tags: string[];
};

export const experiences: ExperienceItem[] = [
  {
    role: { vi: "Full Stack Engineer", en: "Full Stack Engineer" },
    company: { vi: "iArt Holdings", en: "iArt Holdings" },
    period: { vi: "03/2025 — Nay", en: "Mar 2025 — Present" },
    description: {
      vi: "Xây dựng hệ thống quản lý sản xuất PodFactory (nhà máy in DTG). Thay job full-table-scan bằng fan-out scheduler (400 đơn/tick) giảm độ trễ tạo unit từ vài phút xuống vài giây; thiết kế hệ webhook với khử trùng lặp Redis, rate limit và backoff 8 lần; xử lý race condition bằng distributed lock; kiến trúc data layer đa nền tảng (PostgreSQL 101 models, MongoDB, Redis) và dựng CI/CD với GitHub Actions + Vault → AWS.",
      en: "Built the PodFactory production management system for a DTG print factory. Replaced a full-table-scan job with a fan-out scheduler (400 orders/tick) cutting unit-creation latency from minutes to seconds; designed a webhook system with Redis deduplication, rate limiting and 8-attempt backoff; resolved race conditions with distributed locks; architected a polyglot data layer (PostgreSQL 101 models, MongoDB, Redis) and set up CI/CD with GitHub Actions + Vault → AWS.",
    },
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "AWS"],
  },
  {
    role: { vi: "Backend Developer", en: "Back End Developer" },
    company: { vi: "Jeeves", en: "Jeeves" },
    period: { vi: "03/2023 — 10/2024", en: "Mar 2023 — Oct 2024" },
    description: {
      vi: "Thiết kế và xây dựng RESTful API cho hồ sơ doanh nghiệp, tài liệu đăng ký kinh doanh và luồng phê duyệt tín dụng. Triển khai hệ RBAC với JWT/OAuth2 cô lập quyền chặt chẽ (Manager phê duyệt, Support chỉ xem), tối ưu schema CSDL theo dõi trạng thái realtime & audit log, và module upload tài liệu pháp lý an toàn.",
      en: "Designed and built RESTful APIs for corporate profiles, business registration documents and multi-stage credit approval workflows. Implemented a strict RBAC system with JWT/OAuth2 (Managers approve, Support view-only), optimized database schemas for real-time state tracking & audit logs, and secure legal-document upload modules.",
    },
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "JWT / OAuth2"],
  },
  {
    role: { vi: "Backend Developer", en: "Back End Developer" },
    company: { vi: "FPT Software", en: "FPT Software" },
    period: { vi: "04/2021 — 10/2022", en: "Apr 2021 — Oct 2022" },
    description: {
      vi: "Tham gia phát triển nền tảng hội thoại AI thế hệ mới của FPT. Xây dựng backend Python (FastAPI) cho tương tác AI realtime, tích hợp LLM (OpenAI, Llama) qua LangChain, dựng pipeline xử lý giọng nói realtime (STT/TTS) qua WebSocket và giảm 40% thời gian phản hồi nhờ tối ưu prompt và caching.",
      en: "Contributed to FPT's next-generation AI conversational platform. Built Python (FastAPI) backends for real-time AI interactions, integrated LLMs (OpenAI, Llama) via LangChain, engineered real-time voice pipelines (STT/TTS) over WebSocket and cut response latency by 40% through prompt engineering and caching.",
    },
    tags: ["Python", "FastAPI", "LangChain", "WebSocket", "Redis"],
  },
];

export type Education = {
  school: L10n;
  degree: L10n;
  period: L10n;
};

export const education: Education = {
  school: { vi: "Đại học Điện lực", en: "Electric Power University" },
  degree: {
    vi: "Kỹ sư — Kỹ thuật phần mềm",
    en: "Engineer's Degree — Software Engineering",
  },
  period: { vi: "09/2020 — 08/2025", en: "Sep 2020 — Aug 2025" },
};
