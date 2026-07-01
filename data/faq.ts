import type { L10n } from "@/lib/i18n/types";

export type Faq = {
  id: string;
  question: L10n;
  answer: L10n;
};

/** Q&A cho khung chat — bám theo QuestionAndAnswer.md. Chỉnh ở đây khi cần. */
export const faqs: Faq[] = [
  {
    id: "banking",
    question: {
      vi: "Bạn có biết về Domain Banking không?",
      en: "Do you know the Banking domain?",
    },
    answer: {
      vi: "Mình biết chút ít, vì đây là domain mới với mình — nhưng mình học khá nhanh.",
      en: "A little — it's a new domain for me, but I pick things up quickly.",
    },
  },
  {
    id: "pod",
    question: {
      vi: "Trước đây bạn từng làm domain gì?",
      en: "What domain did you work in before?",
    },
    answer: {
      vi: "Mình từng làm domain POD (Print On Demand).",
      en: "I previously worked in the POD (Print On Demand) domain.",
    },
  },
  {
    id: "java",
    question: {
      vi: "Bạn từng học Java chưa?",
      en: "Have you studied Java?",
    },
    answer: {
      vi: "Mình học Java hồi đại học và đã làm phần mềm quản lý sinh viên. Qua thời gian có hơi quên, nhưng chỉ cần một thời gian ngắn ôn lại là nắm được.",
      en: "I studied Java in university and built a student management app with it. I'm a bit rusty now, but I'd only need a short time to get back up to speed.",
    },
  },
  {
    id: "rampup",
    question: {
      vi: "Bạn nghĩ mình sẽ bắt kịp công việc trong bao lâu?",
      en: "How long would you need to ramp up?",
    },
    answer: {
      vi: "Mình nghĩ chỉ trong khoảng 3 tuần là sẽ nắm được Spring Boot.",
      en: "I think I could get comfortable with Spring Boot in about 3 weeks.",
    },
  },
  {
    id: "module",
    question: {
      vi: "Trong dự án của bạn, module nào quan trọng nhất?",
      en: "Which module matters most in your project?",
    },
    answer: {
      vi: "Vì dự án xoay quanh quá trình sản xuất của công nhân nên quan trọng nhất là Production Workflow (Pick → Print → QC → Pack → Ship). Mọi thứ khác đều phục vụ nó: Dashboard, BullMQ queue tự động tạo units, Webhook bắn trạng thái ra ngoài, Working Time tính giờ theo từng bước, và SLA tracking theo dõi deadline — tất cả đều bám theo workflow này.",
      en: "Since the project revolves around the factory production process, the most important is the Production Workflow (Pick → Print → QC → Pack → Ship). Everything else serves it: the Dashboard, the BullMQ queue that auto-creates units, the Webhooks that emit status, Working Time that measures each step, and SLA tracking that watches deadlines — all built around this workflow.",
    },
  },
  {
    id: "webhook",
    question: {
      vi: "Kỹ thuật phức tạp nhất trong dự án là gì?",
      en: "What was the most technically complex part?",
    },
    answer: {
      vi: "Module phức tạp nhất là Vendor Webhook — bắn trạng thái sản xuất ra ngoài cho vendor sau mỗi bước trong dây chuyền.\n\nNó khó vì phải đúng cả trong những tình huống mình không kiểm soát được: vendor có sống không, có bị rate limit không, network có ổn định không. Pick hay Print nếu lỗi thì user thấy ngay và làm lại được; webhook thì âm thầm fail.\n\nBa bài toán chính: (1) Không gửi trùng — gửi SHIPPED hai lần vendor có thể xử lý đơn hai lần, nên dùng Redis track status đã gửi. (2) Tính đúng trạng thái tổng hợp — một order nhiều sản phẩm ở các trạng thái khác nhau, phải lấy trạng thái cao nhất theo thứ tự STARTED → PRINTING → SHIPPED. (3) Retry thông minh — vendor trả 429 thì đọc Retry-After và chờ đúng thời gian, tránh retry dồn dập.\n\nNgoài ra còn race condition: lúc enqueue order đang PRINTING nhưng khi worker chạy đã SHIPPED — nên worker phải tính lại từ DB thay vì dùng data lúc enqueue.",
      en: "The most complex module is the Vendor Webhook — it emits production status to external vendors after each step of the line.\n\nIt's hard because it must be correct even in situations I don't control: whether the vendor is up, rate-limiting me, or the network is stable. Pick or Print fail visibly and can be retried; a webhook fails silently.\n\nThree core problems: (1) No duplicate sends — sending SHIPPED twice could make a vendor process an order twice, so I track sent status in Redis. (2) Correct aggregate status — an order has many items in different states, so I take the highest status in the order STARTED → PRINTING → SHIPPED. (3) Smart retries — on a 429 I read Retry-After and wait exactly that long instead of hammering.\n\nThere's also a race condition: at enqueue time an order may be PRINTING, but by the time the worker runs it's already SHIPPED — so the worker recomputes from the DB rather than trusting the enqueue-time data.",
    },
  },
  {
    id: "acid",
    question: {
      vi: "Bạn đảm bảo tính nhất quán dữ liệu (ACID) như thế nào?",
      en: "How do you ensure data consistency (ACID)?",
    },
    answer: {
      vi: "Có. Dự án dùng PostgreSQL nên có ACID đầy đủ, và mình dùng transaction ở mọi bước quan trọng trong dây chuyền.\n\nVí dụ: khi worker finish shipping box, mình update tất cả order units sang shipped và update order status sang SHIPPED trong cùng một transaction. Nếu không, lỡ update units xong nhưng order status fail thì webhook sẽ tính sai aggregate status và bắn nhầm ra ngoài. Packing, picking, cycle count cũng vậy — ghi nhiều bảng cùng lúc đều wrap transaction.\n\nNhưng hệ thống tổng thể là distributed (Redis, BullMQ) nên không thể ACID xuyên suốt. Phần đó mình đảm bảo bằng: Redis lock có TTL tránh concurrent writes, idempotency check trước mỗi write quan trọng, và status guard — ví dụ trước khi tạo unit thì re-check order còn Confirmed, nếu đã Cancel thì bỏ qua. Nhờ vậy hệ thống tự recover về đúng trạng thái dù component nào fail.",
      en: "Yes. The project uses PostgreSQL, so it has full ACID, and I use transactions at every critical step of the line.\n\nFor example, when a worker finishes shipping a box, I update all order units to shipped and the order status to SHIPPED in the same transaction. Otherwise, if the units update succeeds but the order status fails, the webhook would compute the wrong aggregate status and emit the wrong state. Packing, picking, cycle count are the same — any multi-table write that must stay consistent is wrapped in a transaction.\n\nBut the overall system is distributed (Redis, BullMQ), so end-to-end ACID isn't possible. There I rely on Redis locks with TTL to prevent concurrent writes, idempotency checks before each critical write, and status guards — e.g. before creating a unit I re-check the order is still Confirmed and skip it if it's been Cancelled. This keeps the system self-healing to a correct state even if a component fails.",
    },
  },
];
