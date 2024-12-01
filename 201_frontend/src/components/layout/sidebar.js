// create sidebar with nav
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Star, Search, MessageCircle, User } from 'lucide-react'


function Sidebar() {

    return (

        <nav class="flex h-full w-64 flex-col bg-[#50C878] justify-start p-2 gap-2">
            <div class="flex justify-start pt-2">
                <img
                    src="/images/Rankify logo.svg"
                    width={120} height={100}
                    alt="Rankify"
                />
            </div>
            <div style={{ borderTop: '1px solid #000000', marginLeft: 16, marginRight: 16 }}></div>
            <div className="flex-1 space-y-2">
                <NavLink
                    to="/home"
                    className={({ isActive }) => `
                    flex items-center gap-3 rounded-full px-4 py-3 text-black font-medium no-underline transition-colors
                    ${isActive ? 'bg-[#BAECCA]' : 'hover:bg-[#BAECCA]'}
                    `}
                >
                    <Star className="h-5 w-5" />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) => `
                    flex items-center gap-3 rounded-full px-4 py-3 text-black font-medium no-underline transition-colors
                    ${isActive ? 'bg-[#BAECCA]' : 'hover:bg-[#BAECCA]'}
                    `}
                >
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                </NavLink>

                <NavLink
                    to="/messages"
                    className={({ isActive }) => `
                    flex items-center gap-3 rounded-full px-4 py-3 text-black font-medium no-underline transition-colors
                    ${isActive ? 'bg-[#BAECCA]' : 'hover:bg-[#BAECCA]'}
                    `}
                >
                    <MessageCircle className="h-5 w-5" />
                    <span>Messages</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) => `
            flex items-center gap-3 rounded-full px-4 py-3 text-black font-medium no-underline transition-colors
            ${isActive ? 'bg-[#BAECCA]' : 'hover:bg-[#86efac]'}
          `}
                >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                </NavLink>
            </div>

            <div class="flex justify-center items-center pb-3">
                <img
                    src="/images/spotifylogo.png"
                    alt="Spotify"
                    height={30}
                    width={100}
                />
            </div>
        </nav>
    )
}


export default Sidebar