"use client";
import { useState, useEffect } from "react";
import PatientsTable from "../components/patientsTable";

export default function PatientsPage() {
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    }, [role]);
  return role ? <PatientsTable role={role}/> : null ;
}