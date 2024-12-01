import React from 'react';
import { Link } from 'react-router-dom';


export default function UserCard({ user }) {

  return (
    <Link to={`/user/${user.name}`} className="text-black block no-underline">
      <div className="bg-black/20 p-4 rounded-2xl text-center hover:bg-black/10 transition">
      <div className="w-32 h-32 mx-auto mb-2 overflow-hidden rounded-full">
          <img 
            src="/images/Blank User.svg" 
            alt={`${user.name}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-semibold text-base text-white mt-4">{user.name}</div>
      </div>
    </Link>
  );
}