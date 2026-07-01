/**
 * Nền aurora cố định — 3 blob gradient trôi chậm phía sau toàn trang.
 * Server component (không cần JS), animation thuần CSS → nhẹ & mượt.
 * Màu lấy từ token --aurora-* nên tự đổi theo theme.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="aurora-blob left-[-10%] top-[-15%] h-[55vh] w-[55vh]"
        style={{
          background: "var(--aurora-1)",
          animation: "aurora-drift-a 22s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob right-[-8%] top-[10%] h-[50vh] w-[50vh]"
        style={{
          background: "var(--aurora-2)",
          animation: "aurora-drift-b 26s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob bottom-[-20%] left-[25%] h-[60vh] w-[60vh]"
        style={{
          background: "var(--aurora-3)",
          animation: "aurora-drift-c 30s ease-in-out infinite",
        }}
      />
      {/* Vignette làm dịu rìa để text luôn dễ đọc */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_92%)]" />
    </div>
  );
}
