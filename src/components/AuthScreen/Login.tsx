'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import CryptoJS from 'crypto-js';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const SECRET_KEY = 'fame_secret_key'; // use .env for production

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fameafriqa.com/users/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      // ✅ Encrypt and store the user securely
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data.user), SECRET_KEY).toString();
      localStorage.setItem('fame_user', encrypted);

      toast.success('Welcome back!');
      router.push('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center ">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4 text-black">
          <div className="flex flex-col items-center">
            <img src="/assets/title.png" alt="Fame" className="w-24" />
            <h2 className="text-2xl font-bold text-center">Login</h2>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Password</Label>
              <div className="text-xs text-blue-500 cursor-pointer">Forgot Password?</div>
            </div>
            <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
          </div>

          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-px bg-gray-400" />
            <span>or</span>
            <div className="flex-1 h-px bg-gray-400" />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Sign in with Facebook
          </Button>

          <Button className="w-full bg-gray-200 hover:bg-gray-300 text-black">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
