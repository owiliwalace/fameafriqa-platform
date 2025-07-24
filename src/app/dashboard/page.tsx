"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    );
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const { name, email, avatar_url } = session.user as {
    name: string;
    email: string;
    avatar_url?: string;
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {name} 👋</h1>
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatar_url} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>
    </div>
  );
}
