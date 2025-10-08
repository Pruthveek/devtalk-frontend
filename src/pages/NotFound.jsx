export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! Page Not Found</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}
