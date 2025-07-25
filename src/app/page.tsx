'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';

import LayoutShell from '@/components/layout-shell';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type User = {
  name: string;
  avatar_url?: string;
  role?: string;
  email: string;
};

const SECRET_KEY = 'fame_secret_key';

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const encryptedData = localStorage.getItem('fame_user');

    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // Safeguard against malformed JSON
        if (!decrypted) throw new Error('Empty decryption result');

        const parsed: User = JSON.parse(decrypted);

        setUser(parsed);

        if (parsed.role === 'default_user') {
          setShowModal(true);
        }
      } catch (error) {
        console.error('Decryption failed or invalid data:', error);
        setUser(null);
        localStorage.removeItem('fame_user');
        router.replace('/Authentication');
      }
    } else {
      router.replace('/Authentication');
    }
  }, [router]);

  if (!user) return null;

  return (
    <LayoutShell>
      {/* 🚫 Modal for limited access */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limited Access</DialogTitle>
          </DialogHeader>
          <p>
            Your account currently has a <strong>{user.role}</strong> role with limited permissions.
            Please contact the admin to upgrade your access.
          </p>
        </DialogContent>
      </Dialog>

      {/* ✅ Welcome section */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          {user.avatar_url ? (
            <AvatarImage src={user.avatar_url} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          )}
        </Avatar>
        <h3 className="text-3xl font-bold text-black">
          Welcome, {user.name ?? 'to FameAfriqa'}!
        </h3>
      </div>

      <p className="mt-2 text-muted-foreground">
        You are successfully logged in as <strong>{user.role}</strong> ({user.email})
      </p>
    </LayoutShell>
  );
}
