'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
  });

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
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error('An unknown error occurred');
  }
}

  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center">
      

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="bg-white/90 shadow-xl backdrop-blur border border-white rounded-xl">
          <CardContent className="p-6 space-y-4 text-black">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL (optional)</Label>
              <Input name="avatar_url" value={form.avatar_url} onChange={handleChange} />
            </div>

            <Button onClick={handleSubmit} disabled={loading} className="w-full">
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
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
