"use client";

import { useEffect, useRef, useState } from "react";
import api from "../lib/api";
import { Patient } from "@/types/patient";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { X } from "lucide-react";
import useOutsideClick from "../hooks/useOutsideClick";

interface PatientFormProps {
  patient?: Patient | null;
  onClose: () => void;
  onSave: () => void;
}

export default function PatientForm({
  patient,
  onClose,
  onSave,
}: PatientFormProps) {
  const [form, setForm] = useState({
    //id: patient?.id || "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  
  const queryClient = useQueryClient();

  // Close modal on outside click
  useOutsideClick(modalRef, onClose);

  // Populate form on edit
  useEffect(() => {
    if (patient) {
      setForm({
        //id: patient.id || "",
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        phoneNumber: patient.phoneNumber || "",
        dob: patient.dob ? patient.dob.slice(0, 10) : "",
      });
    }
  }, [patient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        //dob: new Date(form.dob).toISOString(),
      };
      if (patient) {
        // Update logic
        await api.put(`/patients/${patient.id}`, payload);
        toast.success("Patient updated successfully");
      } else {
        // Create logic
        await api.post("/patients", payload);
        toast.success("Patient added successfully");
        console.log("Creating patient with payload:", payload);
      }

      await queryClient.invalidateQueries({ queryKey: ["patients"] });
      onSave();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-6"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {patient ? "Edit Patient" : "Add Patient"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) => (
            <input
              key={key}
              className="border p-2 rounded text-sm"
              placeholder={key}
              value={value}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              type={key === "dob" ? "date" : "text"}
              required
            />
          ))}
          <div className="col-span-2 flex justify-center mt-2">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
              type="submit"
            >
              {patient ? "Update Patient" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
