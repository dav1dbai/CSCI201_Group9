//test page for messages
import Sidebar from '../components/layout/sidebar';

export default function Messages() {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Messages</h2>
          <p className="text-base mb-4 text-white">Your messages will appear here.</p>
        </div>
      </div>
    )
  }
  
  