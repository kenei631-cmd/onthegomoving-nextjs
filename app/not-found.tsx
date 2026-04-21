
// Force dynamic rendering to avoid prerender issues with LayoutRouterContext

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        padding: "2rem",
        textAlign: "center",
        background: "#fff",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color: "#1a1a1a",
          margin: "0 0 1rem",
        }}
      >
        404
      </h1>
      <h2
        style={{ fontSize: "1.5rem", color: "#444", margin: "0 0 1rem" }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          color: "#666",
          margin: "0 0 2rem",
          maxWidth: "400px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          background: "#e63946",
          color: "white",
          padding: "0.75rem 2rem",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
