import React from 'react';
import { Link } from 'react-router-dom';

export function Song({ song}) {
    return (
        <Link to={`/song/${song.title}`} className="block text-black no-underline">
          <div className="space-y-2 rounded-lg hover:bg-black/10 transition">
          <div
            className={`aspect-square rounded-2xl bg-gradient-to-b overflow-hidden`}
          >
            <img
              src="/images/Blank Album Cover.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white text-base truncate mt-3 mb-1 ml-1">{song.title}</h3>
            <p className="text-zinc-400 text-sm truncate ml-1">{song.artist}</p>
          </div>
                </div>
        </Link>
    )
  }