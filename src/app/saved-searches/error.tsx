'use client'
export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-red-600 text-center mt-8">
      Failed to load saved searches: {error.message}
    </div>
  )
}
