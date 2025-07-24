'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music, Upload, Library, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Upload', href: '/dashboard/upload', icon: Upload },
  { name: 'Library', href: '/dashboard/library', icon: Library },
  { name: 'Discover', href: '/dashboard/discover', icon: Music },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 h-full">
        <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-white text-2xl font-bold">MusicDistro</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="px-4 py-4 border-t border-gray-700">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/avatars/default.png" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User Name</p>
                <button className="text-xs font-medium text-gray-400 hover:text-white">
                  View profile
                </button>
              </div>
            </div>
            <Button variant="ghost" className="mt-4 w-full text-gray-300 hover:text-white">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}