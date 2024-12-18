
export function SongCard({ title, artist }) {
  return (
    <div className="bg-black/20 rounded-2xl p-4 space-y-4">
      <div className="aspect-square bg-zinc-700 rounded-2xl overflow-hidden">
        <img 
          src="/images/Blank Album Cover.svg" 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="pt-2 text-xl font-semibold text-white mb-0">{title}</h3>
        <p className="text-white/60 mt-1 mb-0">{artist}</p>
      </div>
    </div>
  )
}