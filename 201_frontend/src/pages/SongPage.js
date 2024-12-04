import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Star, X, Play } from 'lucide-react'
import Sidebar from '../components/layout/sidebar'
import { getTrackById } from '../utils/spotify'
import { submitReview, getReviewsByTrack, validateReview } from '../utils/reviews'

export default function SongPage() {
  const { id } = useParams();
  //console.log(id);
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const recentRatings = [
    { user: 'Toayo', rating: '4/5', date: 'yesterday' },
    { user: 'Emmanuela', rating: '2.5/5', date: '2 days ago' },
    { user: 'David', rating: '1/5', date: '3 days ago' },
    { user: 'Malia', rating: '2/5', date: '3 days ago' },
    { user: 'Eric', rating: '4/5', date: '3 days ago' },
    { user: 'Vitor', rating: '3/5', date: '3 days ago' },
    { user: 'Sanya', rating: '2/5', date: '3 days ago' },
    { user: 'Alex', rating: '5/5', date: '3 days ago' },
    { user: 'Chengxi', rating: '3/5', date: '3 days ago' },
    { user: 'Marco', rating: '5/5', date: '3 days ago' },
  ]

  const [song, setSong] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const song = await getTrackById(id);
      setSong({
        id: song.id,
        songtitle: song.name,
        artist: song.artists.length > 0 ? song.artists[0].name : '',
        album: song.album.name,
        coverArt: song.album.images[0]?.url || '',
        previewUrl: song.preview_url,
      });
    }
    fetchData();
  }, []);

  const handleSubmitReview = async () => {
    console.log("submitting review");
    const userId = localStorage.getItem('userId');
    const { isValid, errors } = await validateReview(userId, song.id, rating, review);
    console.log("isValid: ", isValid);
    console.log("errors: ", errors);
    if (!isValid) {
      setError(errors);
      return;
    }
    const res = await submitReview(userId, song.id, rating, review);
    console.log("res: ", res);
    if (res.error) {
      setError(res.error);
      return;
    }
    setShowRatingModal(false);
  }

  return (
    <div className="flex min-h-screen bg-[#393939]">
      <Sidebar />
      <div className="flex-1">
        <Link to="/search" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="ml-4 mr-2 mt-3" size={20} />
        </Link>
        <div className="flex items-center gap-6 mb-8 ml-16">
          <div className="w-44 h-44 bg-purple-500 rounded-lg flex-shrink-0" >
            <img
              src={song.coverArt}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl text-white font-bold mb-3">{song.songtitle}</h1>
            {/*<div className="text-sm text-white/60 mt-2 mb-2">Genre: {song.genre}</div>*/}
            <div className="font-semibold text-white">{song.artist}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-16 mt-12 mb-8">
          <button
            className="px-3 py-1 bg-green-600 rounded-full hover:bg-green-700 transition flex items-center"
          >
            <Play strokeWidth={1} fill="#393939" className="w-6 h-12 rounded-full" />
          </button>
          <button
            onClick={() => setShowRatingModal(true)}
            className="px-4 py-2 text-white outline outline-1 font-medium text-sm  rounded-full hover:bg-white/20 transition"
          >
            Rank this song
          </button>
        </div>
        <div className="flex w-screen items-center mb-4 border-b border-white/40">
          <div className="w-screen grid grid-cols-12 gap-16 mb-2 ml-16 mr-64 text-sm font-medium text-white/70">
            <div class='col-span-5 ml-2'>User</div>
            <div class='col-span-2'>Rating</div>
            <div class='col-span-3'>Date</div>
          </div>
        </div>

        <div className="ml-2">
          {recentRatings.map((rating, index) => (
            <div key={index} className="grid grid-cols-12 items-center justify-between ml-16 pb-3 rounded-lg">
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full" >
                  <img src="/images/Blank User.svg" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-white font-medium">{rating.user}</div>
              </div>
              <div className="ml-12 text-md text-white/60">{rating.rating}</div>
              <div className="col-span-4 ml-32 align-end text-md text-white/60">{rating.date}</div>
            </div>
          ))}
        </div>

        {showRatingModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="grid grid-cols-2  bg-[#585858] rounded-lg w-fit max-w-4xl">
              {/*song card*/}
              <div className="flex ml-16 mr-2 my-12">
                <div className="bg-black/20 rounded-2xl p-4 space-y-4">
                  <div className="aspect-square bg-zinc-700 rounded-2xl overflow-hidden">
                    <img
                      src={song.coverArt}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="pt-2 text-xl font-semibold text-white mb-0">{song.songtitle}</h3>
                    <p className="text-white/60 mt-1 mb-0">{song.artist}</p>
                  </div>
                </div>
              </div>
              {/*rating info*/}
              <div className="mr-6 ml-2">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-white mt-14 mb-3">Rate this song</h2>
                  <button className="text-white" onClick={() => setShowRatingModal(false)}>
                    <X size={20} />
                  </button>
                </div>

                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`${rating >= star ? 'text-yellow-400' : 'text-white/40'}`}
                    >
                      <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div >
                  <div className='mr-12'>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full h-40 bg-white/30 rounded-lg p-3 placeholder:text-white text-white mb-3"
                      rows={4}
                    />
                    {error && <div className="text-red-500">{error}</div>}
                    <button
                      onClick={() => {
                        handleSubmitReview();
                      }}
                      className="w-full bg-[#50C878] text-white rounded-lg py-2 hover:bg-[#50C878]/60 transition"
                    >
                      Submit
                    </button>
                  </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}