import React from 'react';
import SigInButton from './SigIn/SigInButton.tsx';
import { getProfile, logout } from '../auth/auth.utils';

function Header() {
  const user = getProfile();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
      <div>
        <a href={'/address/list'} className="mr-4">
          Address All
        </a>
        <a href={'/address/list/1'} className="mr-4">
          Address One (By ID 1)
        </a>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <img src={user.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="text-sm">{user.name}</span>
            <button onClick={logout} className="text-sm text-red-500 underline">
              Logout
            </button>
          </>
        ) : (
          <SigInButton />
        )}
      </div>
    </div>
  );
}

export default Header;
