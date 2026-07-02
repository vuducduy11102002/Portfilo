import type { L10n } from "@/lib/i18n/types";

type Stat = { label: L10n; value: string };

export const siteConfig = {
  name: "Vũ Đức Duy",
  /** Thay bằng path logo của bạn: "/logo.svg" — để trống thì dùng initials */
  logo: "" as string,
  /** Ảnh avatar hero: thả file vào web/public/ rồi điền "/avatar.jpg". Để trống → dùng monogram. */
  avatar: "/Media.jpg" as string,

  role: {
    vi: "Full Stack Developer",
    en: "Full Stack Developer",
  } satisfies L10n,

  /** Cụm từ vai trò đảo qua lại ở hero. */
  roles: {
    vi: [
      "Full Stack Developer",
      "Backend Engineer",
      "Node.js & TypeScript",
      "Kỹ sư hệ thống mở rộng",
    ],
    en: [
      "Full Stack Developer",
      "Backend Engineer",
      "Node.js & TypeScript",
      "Scalable Systems Engineer",
    ],
  } satisfies L10n<string[]>,

  tagline: {
    vi: "Hơn 3 năm xây dựng ứng dụng web mở rộng. Đam mê kiến trúc sạch, trải nghiệm lập trình viên và tạo ra sản phẩm người dùng yêu thích.",
    en: "3+ years building scalable web applications. Passionate about clean architecture, developer experience, and shipping products users love.",
  } satisfies L10n,

  email: "so7ngovanso@gmail.com",
  phone: "0973 628 663",

  location: {
    vi: "Hà Nội, Việt Nam",
    en: "Hanoi, Vietnam",
  } satisfies L10n,

  /** Badge trạng thái ở hero */
  available: true,
  availableText: {
    vi: "Đang nhận cơ hội mới",
    en: "Open to new opportunities",
  } satisfies L10n,

  links: {
    github: "https://github.com/vuducduy22",
    linkedin: "https://www.linkedin.com/in/duy-vu-5bb6291a4/",
  },

  about: {
    vi: `Mình là Full Stack Developer với hơn 3 năm kinh nghiệm xây dựng những hệ thống web có khả năng mở rộng cao. Thế mạnh của mình là backend — Node.js, TypeScript, Python — cùng kiến trúc dữ liệu đa nền tảng (PostgreSQL, MongoDB, Redis) và tối ưu hiệu năng ở quy mô sản xuất.

Mình thích giải những bài toán khó: fan-out scheduler xử lý 400 đơn/tick, khử trùng lặp webhook bằng Redis, xử lý race condition với distributed lock, hay chẩn đoán truy vấn PostgreSQL chậm. Ngoài ra mình quan tâm tới kiến trúc sạch, DX và vận hành CI/CD.`,
    en: `I'm a Full Stack Developer with 3+ years building highly scalable web systems. My strength is on the backend — Node.js, TypeScript, Python — along with polyglot data layers (PostgreSQL, MongoDB, Redis) and performance tuning at production scale.

I enjoy hard problems: fan-out schedulers handling 400 orders/tick, Redis-based webhook deduplication, race conditions solved with distributed locks, and diagnosing slow PostgreSQL queries. I also care deeply about clean architecture, DX and CI/CD operations.`,
  } satisfies L10n,

  stats: [
    { label: { vi: "Năm kinh nghiệm", en: "Years of experience" }, value: "3+" },
    { label: { vi: "Dự án tiêu biểu", en: "Notable projects" }, value: "5+" },
    { label: { vi: "Giảm độ trễ AI", en: "AI latency cut" }, value: "40%" },
  ] as Stat[],
} as const;
