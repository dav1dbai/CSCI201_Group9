import { StarRating } from './StarRating'
import { Link } from 'react-router-dom'

export function RankedSong({ title, artist, rating, image, id }) {
  return (
    <Link to={`/song/${id}`} className="block text-black no-underline">
      <div className="bg-black/20 rounded-2xl p-4 space-y-4">
        <div className="aspect-square bg-zinc-700 rounded-2xl overflow-hidden">
          <img 
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="pt-2 text-xl font-semibold text-white mb-0">{title}</h3>
          <p className="text-white/60 mt-1 mb-0">{artist}</p>
        </div>
        <div className="flex items-end mt-2">
          <StarRating rating={rating} />
        </div>
      </div>
    </Link>
  )
}
