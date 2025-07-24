'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
  });

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://fameafriqa.com/users/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('fame_user', JSON.stringify(data.user));
      toast.success('Account created successfully!');
      router.push('/');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/assets/auth.jpeg')] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/1 backdrop-blur-[4px] z-0" />
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="bg-white/90 shadow-xl backdrop-blur border border-white rounded-xl">
          <CardContent className="p-2 space-y-2 text-black">
            <div className="flex flex-col items-center select-none">
              <img
                src="/assets/title.png"
                alt="Fame"
                className="w-24"
              />
              <h2 className="text-2xl font-bold text-center mt-0">Create Account</h2>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className='b border-black border-[0.2px]'
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className='b border-black'
              />
            </div>

            <div className="space-y-2">
              <div className=' flex items-center w-full justify-between'>

              <Label >Password</Label>
              <div className="text-xs text-blue-500 ">
                Forgot Password?
              </div>
              </div>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className='b border-black'
              />
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? 'Registering...' : 'Register'}
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

            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account?{' '}
              <span
                onClick={() => router.push('/login')}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
