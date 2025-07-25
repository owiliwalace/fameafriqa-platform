'use client';

import {
  Home,
  Music,
  UploadCloud,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import clsx from 'clsx';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = (label: string) => {
    setOpen(open === label ? null : label);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
    <aside
      className={clsx(
        'hidden md:flex flex-col border-r bg-muted min-h-screen transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <span className="font-bold text-lg">FameAfriqa</span>}
        <button
          onClick={toggleCollapse}
          className="p-1 hover:bg-accent rounded transition ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 px-2 pb-4">
          {menuItems.map((item) => {
            const isOpen = open === item.label;
            return (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
                  >
                    <item.icon className="h-5 w-5" />
                    {!isCollapsed && item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggle(item.label)}
                      className="flex items-center w-full gap-3 px-2 py-2 rounded-md text-sm font-medium hover:bg-accent transition"
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && item.label}
                      {!isCollapsed &&
                        (isOpen ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ))}
                    </button>
                    {isOpen && item.children && !isCollapsed && (
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
        {!isCollapsed && (
          <div className="text-sm text-muted-foreground truncate">{user?.name}</div>
        )}
      </div>
    </aside>
  );
}
