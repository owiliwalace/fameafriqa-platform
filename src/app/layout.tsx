import './globals.css';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fame',
  description: 'Fame',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
