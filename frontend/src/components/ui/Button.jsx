export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  full = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        background: "linear-gradient(135deg, var(--primary), var(--accent))",
      }}
      className={`
        text-white px-6 py-3 rounded-full font-medium transition
        hover:opacity-90
        ${full ? "w-full" : ""}
        ${(loading || disabled) ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}