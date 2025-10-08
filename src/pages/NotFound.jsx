export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-base-content/70">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <a href="/" className="btn btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
}
