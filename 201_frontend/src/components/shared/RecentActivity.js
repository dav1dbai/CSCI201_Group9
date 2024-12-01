import { StarRating } from "./StarRating"

export function RecentActivity({ activity }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-md overflow-hidden">
        <img
          src="/images/Blank Album Cover.svg"
          alt="Activity thumbnail"
          className="w-full h-full object-cover"
        />      
        </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/90 mb-1">Rated "{activity.song}"</div>
            <StarRating rating={activity.rating} />
          </div>
          <div className="text-sm text-white/60">{activity.timestamp}</div>
        </div>
      </div>
    </div>
  )
}