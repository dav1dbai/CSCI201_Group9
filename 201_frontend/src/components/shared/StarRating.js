import { Star } from 'lucide-react'

export function StarRating({ rating = 0, maxStars = 5 }) {
  return (
    <div className="flex gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/40'}`}
          fill={i < rating ? 'currentColor' : 'transparent'}
          strokeWidth={2}
        />
      ))}
    </div>
  )
}