"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PatientsTable from "./components/patientsTable";
import LoginForm from "./components/loginForm";

export default function Home() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const storedRole = localStorage.getItem("role");
  //   if (!token) router.push("/login");
  //   else
  //    setRole(storedRole);
  // }, [router]);

  // if (!role) return <p className="text-center mt-12">Loading...</p>;
  // return <PatientsTable role={role} />;
  
  return(
    <div>
      <header></header>
      <main>
        <LoginForm />
      </main>
      <footer></footer>
    </div>
  );
}