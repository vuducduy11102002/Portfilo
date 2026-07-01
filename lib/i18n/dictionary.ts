import type { Locale } from "./types";

/** Chuỗi UI tĩnh (không nằm trong data). Mỗi khóa có bản vi & en. */
export const dictionary = {
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      contact: "Liên hệ",
    },
    hero: {
      greeting: "Xin chào, tôi là",
      viewProjects: "Xem dự án",
      contact: "Liên hệ",
      downloadCV: "Tải CV",
      explore: "Khám phá thêm",
    },
    about: {
      principlesTitle: "Nguyên tắc làm việc",
    },
    now: {
      tag: "// hiện tại",
      title: "Điều tôi đang tập trung",
      building: "Đang xây dựng",
      learning: "Đang học",
      exploring: "Đang khám phá",
      localTime: "Giờ địa phương",
    },
    metrics: {
      tag: "// theo con số",
    },
    ask: {
      tag: "// hỏi nhanh",
      title: "Trò chuyện với mình",
      status: "Thường phản hồi trong 24h",
      greeting:
        "Chào bạn 👋 Mình là Duy. Bạn muốn biết điều gì? Chọn một câu hỏi bên dưới nhé.",
      reset: "Hỏi lại từ đầu",
      allDone: "Hết câu hỏi gợi ý rồi — muốn trao đổi thêm, nhắn mình trực tiếp nhé!",
      contactCta: "Liên hệ trực tiếp",
      hint: "Muốn hiểu hơn về các dự án của mình? Bấm vào đây để hỏi nhé 👇",
      open: "Mở khung chat",
      close: "Đóng chat",
    },
    experience: {
      education: "Học vấn",
    },
    projects: {
      featured: "Dự án nổi bật",
      code: "Code",
      demo: "Live Demo",
    },
    contact: {
      titleLead: "Cùng tạo nên điều gì đó",
      titleAccent: "tuyệt vời",
      desc: "Có dự án, cơ hội hợp tác hay chỉ muốn chào hỏi? Gửi tin nhắn — tôi thường phản hồi trong vòng 24 giờ.",
      name: "Tên",
      email: "Email",
      message: "Tin nhắn",
      send: "Gửi tin nhắn",
      sent: "Đã mở ứng dụng email — gửi để hoàn tất.",
    },
    footer: {
      built: "Thiết kế & xây dựng bằng Next.js",
    },
    intro: {
      label: "Portfolio",
      skip: "Bấm để bỏ qua",
    },
    a11y: {
      toggleMenu: "Mở / đóng menu",
      switchLang: "Đổi ngôn ngữ",
      themeLight: "Chuyển sang sáng",
      themeDark: "Chuyển sang tối",
      scrollDown: "Cuộn xuống",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      viewProjects: "View projects",
      contact: "Get in touch",
      downloadCV: "Download CV",
      explore: "Explore more",
    },
    about: {
      principlesTitle: "How I work",
    },
    now: {
      tag: "// now",
      title: "What I'm focused on",
      building: "Building",
      learning: "Learning",
      exploring: "Exploring",
      localTime: "Local time",
    },
    metrics: {
      tag: "// by the numbers",
    },
    ask: {
      tag: "// quick chat",
      title: "Chat with me",
      status: "Usually replies within 24h",
      greeting:
        "Hi 👋 I'm Duy. What would you like to know? Pick a question below.",
      reset: "Start over",
      allDone: "That's all the suggested questions — feel free to reach out directly!",
      contactCta: "Get in touch",
      hint: "Want to know more about my work? Tap here to ask me 👇",
      open: "Open chat",
      close: "Close chat",
    },
    experience: {
      education: "Education",
    },
    projects: {
      featured: "Featured project",
      code: "Code",
      demo: "Live Demo",
    },
    contact: {
      titleLead: "Let's build something",
      titleAccent: "great",
      desc: "Have a project, an opportunity, or just want to say hi? Drop a message — I usually reply within 24 hours.",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      sent: "Email app opened — send it to finish.",
    },
    footer: {
      built: "Designed & built with Next.js",
    },
    intro: {
      label: "Portfolio",
      skip: "Click to skip",
    },
    a11y: {
      toggleMenu: "Toggle menu",
      switchLang: "Switch language",
      themeLight: "Switch to light",
      themeDark: "Switch to dark",
      scrollDown: "Scroll down",
    },
  },
} as const;

export type Dictionary = (typeof dictionary)[Locale];
