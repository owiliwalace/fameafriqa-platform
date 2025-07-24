'use client';

import {
  Home,
  Music,
  UploadCloud,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
 import { ScrollArea } from '@/components/ui/scroll-area';
 
const menuItems = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/app',
  },
  {
    label: 'Music',
    icon: Music,
    children: [
      { label: 'Upload Music', href: '/app/upload/music' },
      { label: 'Manage Music', href: '/app/music/manage' },
    ],
  },
  {
    label: 'Media',
    icon: UploadCloud,
    children: [
      { label: 'Upload Videos', href: '/app/upload/video' },
      { label: 'Upload Images', href: '/app/upload/image' },
    ],
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/app/settings',
  },
];

export function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (label: string) => {
    setOpen(open === label ? null : label);
  };

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-muted min-h-screen">
      <div className="p-6 font-bold text-2xl tracking-tight">
        FameAfriqa
      </div>

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

      <div className="p-4 border-t text-xs text-muted-foreground">
        &copy; 2025 FameAfriqa. All rights reserved.
      </div>
    </aside>
  );
}
