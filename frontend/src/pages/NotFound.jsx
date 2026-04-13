import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="h-[80vh] flex items-center justify-center bg-[var(--light)] px-6">
      
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-7xl font-bold text-[var(--primary)]">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        {/* Desc */}
        <p className="text-gray-600 mt-3">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 text-white rounded-full font-medium"
          style={{
            background:
              "linear-gradient(135deg,var(--primary),var(--accent))",
          }}
        >
          Go Back Home
        </Link>

      </div>

    </section>
  );
}