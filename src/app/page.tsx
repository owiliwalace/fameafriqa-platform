'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/layout-shell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type User = {
  name: string;
  avatar_url?: string;
};

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('fame_user');
    if (storedUser) {
      try {
        const parsed: User = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        setUser(null);
        router.replace('/login');
      }
    } else {
      router.replace('/login');
    }
  }, [router]);

  if (!user) return null;

  return (
    <LayoutShell>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Avatar>
          {user.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.name} />
          ) : (
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          )}
        </Avatar>
        <h3
          style={{ color: 'blue' }}
          className="text-3xl font-bold text-blue"
        >
          Welcome, {user.name ?? 'to FameAfriqa'}!
        </h3>
      </div>

      <p className="mt-2 text-muted-foreground">Youre successfully logged in!</p>
    </LayoutShell>
  );
}
