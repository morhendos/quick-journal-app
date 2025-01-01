export default function AuthErrorLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
        <div className="mt-4 h-10 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}