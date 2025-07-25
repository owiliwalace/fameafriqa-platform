'use client';

import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import Login from '@/components/AuthScreen/Login';
import Register from '@/components/AuthScreen/Register';
import FloatingCard from '@/components/FloatingCard';

export default function Authentication() {
  const [name, setName] = useState('Pedro Duarte');
  const [username, setUsername] = useState('@peduarte');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
     <div className="min-h-screen bg-cover bg-center bg-[url('/assets/auth.jpeg')] flex items-center justify-center relative">
      
      <div className="absolute inset-0 bg-black/1 backdrop-blur-[4px] z-0 flex flex-col" />
         <div className="relative z-10 w-full max-w-md p-6 pt-0"> {/* Add pt-20 to offset navbar */}

    <div className="flex w-full max-w-md flex-col gap-6 mx-auto p-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
        
            <Login />
         
        </TabsContent>

        <TabsContent value="password">
        
            <Register />
         
        </TabsContent>
      </Tabs>
      <FloatingCard />
    </div>
    </div>
    </div>
    
  );
}
