// components/ArtistRegisterForm.tsx
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ArtistRegisterForm() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    country: '', city: '', music_sample: '',
    about: '', reason: '', role: 'artist',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      alert('Registered successfully!')
      setForm({ ...form, first_name: '', last_name: '', email: '', phone: '', city: '', music_sample: '', about: '', reason: '' })
    } else {
      alert('Error registering.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-xl mx-auto mt-10'>
      <div className='grid grid-cols-2 gap-4'>
        <div><Label>First Name</Label><Input name='first_name' value={form.first_name} onChange={handleChange} /></div>
        <div><Label>Last Name</Label><Input name='last_name' value={form.last_name} onChange={handleChange} /></div>
      </div>
      <Input name='email' placeholder='Email' value={form.email} onChange={handleChange} />
      <Input name='phone' placeholder='Phone' value={form.phone} onChange={handleChange} />
      <Input name='country' placeholder='Country' value={form.country} onChange={handleChange} />
      <Input name='city' placeholder='City' value={form.city} onChange={handleChange} />
      <Input name='music_sample' placeholder='Music Sample URL' value={form.music_sample} onChange={handleChange} />
      <Textarea name='about' placeholder='About You' value={form.about} onChange={handleChange} />
      <Textarea name='reason' placeholder='Why ONErpm-like platform?' value={form.reason} onChange={handleChange} />
      <Button type='submit'>Register</Button>
    </form>
  )
}
