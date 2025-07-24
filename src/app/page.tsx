'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/layout-shell';

export default function AppPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('fame_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
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
      <h1 className="text-3xl font-bold">
        Welcome {user.name ?? 'to FameAfriqa'}!
      </h1>
      <p className="mt-2 text-muted-foreground">Youre successfully logged in!</p>
    </LayoutShell>
  );
}
