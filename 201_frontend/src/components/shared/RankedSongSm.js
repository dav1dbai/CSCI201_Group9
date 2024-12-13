import { StarRating } from './StarRating'

export function RankedSongSm({ title, artist, rating, coverArt }) {
  return (
    <div className="bg-black/20 rounded-2xl p-3 space-y-1">
      <div className="aspect-square bg-zinc-700 rounded-lg overflow-hidden">
        <img 
          src={coverArt}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="pt-2 text-sm font-semibold text-white mb-0">{title}</h3>
        <p className="text-xs text-white/60 mt-1 mb-2">{artist}</p>
      </div>
      <div className="flex self-end">
          <StarRating rating={rating} />
      </div>
    </div>
  )
}
