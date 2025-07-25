'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/layout-shell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type User = {
  name: string;
  avatar_url?: string;
  role?: string; // added role
};

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('fame_user');
    if (storedUser) {
      try {
        const parsed: User = JSON.parse(storedUser);
        setUser(parsed);

        if (parsed.role === 'default') {
          setShowModal(true); // trigger modal
        }
      } catch {
        setUser(null);
        router.replace('/Authentication');
      }
    } else {
      router.replace('/Authentication');
    }
  }, [router]);

  if (!user) return null;

  return (
    <LayoutShell>
      {/* Modal for default role */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limited Access</DialogTitle>
          </DialogHeader>
          <p>Your account currently has a {user.role} role with limited permissions. Please contact the admin to upgrade your access.</p>
        </DialogContent>
      </Dialog>

      {/* Welcome Section */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          {user.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.name} />
          ) : (
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() ?? 'U'}
            </AvatarFallback>
          )}
        </Avatar>
        <h3 className="text-3xl font-bold text-blue-600">
          Welcome, {user.name ?? 'to FameAfriqa'}! 
        </h3>
      </div>

      <p className="mt-2 text-muted-foreground">You re successfully logged in!</p>
    </LayoutShell>
  );
}
