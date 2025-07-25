'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur shadow-sm border-b border-gray-300 px-2 py-1 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer ml-[10%]" onClick={() => router.push('/')}>
       
        <img
                src="/assets/fameWhite.png"
                alt="Fame"
                className="w-24"
              />
      </div>
      
    </nav>
  );
}
