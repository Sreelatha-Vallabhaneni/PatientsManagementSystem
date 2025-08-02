"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./components/loginForm";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div>
      <LoginForm />
    </div>
  );
}
