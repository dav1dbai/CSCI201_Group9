import Sidebar from '../components/layout/sidebar';

export default function Search() {
    return (
      <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Search</h2>
            <p className="text-base mb-4 text-white">This is the Search page. You can add search functionality here.</p>
          </div>
      </div>
    )
  }