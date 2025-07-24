'use client';

import {
  Home,
  Music,
  UploadCloud,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

const menuItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/',
  },
  {
    label: 'Music',
    icon: Music,
    children: [
      { label: 'Upload Music', href: '/upload/music' },
      { label: 'Manage Music', href: '/music/manage' },
    ],
  },
  {
    label: 'Media',
    icon: UploadCloud,
    children: [
      { label: 'Upload Videos', href: '/' },
      { label: 'Upload Images', href: '/' },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/',
  },
];

export function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; avatar_url?: string } | null>(null);

  const toggle = (label: string) => {
    setOpen(open === label ? null : label);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('fame_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-muted min-h-screen">
      <div className="p-6 font-bold text-2xl tracking-tight">FameAfriqa</div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 px-4 pb-4">
          {menuItems.map((item) => {
            const isOpen = open === item.label;
            return (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggle(item.label)}
                      className="flex items-center w-full gap-3 px-2 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {isOpen ? (
                        <ChevronUp className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      )}
                    </button>
                    {isOpen && item.children && (
                      <div className="ml-6 mt-1 flex flex-col">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="text-muted-foreground text-sm py-1 hover:underline"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* USER AVATAR */}
      <div className="flex items-center gap-3 p-4 border-t">
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
            <User className="h-4 w-4" />
          </div>
        )}
        <div className="text-sm text-muted-foreground truncate">{user?.name}</div>
      </div>
    </aside>
  );
}
