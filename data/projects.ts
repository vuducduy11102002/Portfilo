import type { L10n } from "@/lib/i18n/types";

export type Project = {
  title: L10n;
  description: L10n;
  tags: string[];
  year?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: {
      vi: "PodFactory — Hệ thống Quản lý Sản xuất",
      en: "PodFactory — Production Management System",
    },
    description: {
      vi: "Hệ thống quản lý toàn bộ luồng sản xuất Pick → Print → QC → Pack → Ship cho nhà máy in DTG. Fan-out scheduler 400 đơn/tick giảm độ trễ tạo unit từ phút xuống giây; webhook vendor với khử trùng lặp Redis, rate limit 150 req/phút và backoff 8 lần; dashboard đa múi giờ với 6 khối KPI, cảnh báo SLA và biểu đồ xu hướng.",
      en: "A full production workflow system — Pick → Print → QC → Pack → Ship — for a DTG garment factory. A 400-orders/tick fan-out scheduler cut unit-creation latency from minutes to seconds; a vendor webhook system with Redis deduplication, 150 req/min rate limiting and 8-attempt backoff; a timezone-aware dashboard with 6 KPI blocks, SLA alerts and trend charts.",
    },
    tags: [
      "Node.js",
      "Hapi.js",
      "TypeScript",
      "React 18",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Docker",
      "AWS",
    ],
    year: "2025",
    featured: true,
  },
  {
    title: {
      vi: "PodFactory PDA — App Quản lý Kho",
      en: "PodFactory PDA — Warehouse App",
    },
    description: {
      vi: "App PDA quản lý kho cho fulfillment in DTG, bao trọn quy trình WMS: Nhập kho, Cất hàng, Bù hàng, Kiểm kê, Lấy hàng, Xuất hàng. Tích hợp quét barcode/QR cho thao tác tồn kho, đa nền tảng (Android chính, Windows).",
      en: "A warehouse-management PDA app for DTG print fulfillment covering the full WMS flow: Inbound, Put Away, Replenishment, Cycle Count, Picking, Shipping. Barcode/QR scanning for inventory operations, cross-platform (Android primary, Windows).",
    },
    tags: ["Flutter", "Dart", "REST API", "ZXing"],
    year: "2025",
  },
  {
    title: {
      vi: "Pod Client - Print Factory Tool",
      en: "Pod Client - Print Factory Tool",
    },
    description: {
      vi: "Tự động hoá pipeline in DTG/DTF với công cụ dàn trang bằng Python, tích hợp máy Brother GTX + ONYX RIP qua AutoIt3, và tối ưu ghép cuộn vải giúp giảm hao phí.",
      en: "Automated the DTG/DTF print job pipeline with Python layout tools, integrated Brother GTX + ONYX RIP via AutoIt3, and reduced fabric waste with a roll-merge optimizer.",
    },
    tags: ["C# .NET 8", "WinForms", "Python", "AutoIt3"],
    year: "2025",
  },
  {
    title: {
      vi: "Walmart Product Crawler",
      en: "Walmart Product Crawler",
    },
    description: {
      vi: "Crawl hơn 100k sản phẩm từ Walmart.com bằng automation trình duyệt, vượt anti-bot nhờ xoay proxy và undetected-chromedriver, cung cấp REST API truy vấn/lọc dữ liệu, triển khai bằng Docker với quản lý phiên trình duyệt đa hồ sơ.",
      en: "Crawled 100k+ products from Walmart.com via browser automation, bypassed anti-bot detection with proxy rotation and undetected-chromedriver, exposed a REST API for querying/filtering data, deployed with Docker and multi-profile browser sessions.",
    },
    tags: ["Python", "FastAPI", "Selenium", "MongoDB", "Docker"],
    year: "2024",
  },
  {
    title: {
      vi: "Diabetes Prediction — Pipeline ML & Serving",
      en: "Diabetes Prediction — ML Training & Serving Pipeline",
    },
    description: {
      vi: "Pipeline huấn luyện so sánh 10 thuật toán ML (XGBoost, LightGBM, SVM...) cho bài toán phân loại tiểu đường; theo dõi thí nghiệm & model registry bằng MLflow; serving đa mô hình qua FastAPI + Pydantic; observability với OpenTelemetry/Jaeger + Prometheus và load test bằng Locust.",
      en: "A training pipeline comparing 10 ML algorithms (XGBoost, LightGBM, SVM…) for diabetes classification; experiment tracking & model registry with MLflow; multi-model serving via FastAPI + Pydantic; observability with OpenTelemetry/Jaeger + Prometheus and load testing with Locust.",
    },
    tags: ["Python", "FastAPI", "scikit-learn", "MLflow", "Prometheus"],
    year: "2024",
    github: "https://github.com/vuducduy11102002/python-prediction",
  },
];
