import type { L10n } from "@/lib/i18n/types";

export type SkillCategory = {
  id: string;
  name: L10n;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: { vi: "Ngôn ngữ", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    id: "frontend",
    name: { vi: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "Tailwind CSS", "Socket.IO"],
  },
  {
    id: "backend",
    name: { vi: "Backend", en: "Backend" },
    items: ["Node.js", "Express", "NestJS", "Hapi.js", "Flask", "FastAPI"],
  },
  {
    id: "databases",
    name: { vi: "Cơ sở dữ liệu", en: "Databases" },
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "BullMQ"],
  },
  {
    id: "devops",
    name: { vi: "DevOps & Công cụ", en: "DevOps & Tools" },
    items: ["Docker", "AWS", "GitHub Actions", "Nginx", "HashiCorp Vault"],
  },
];
