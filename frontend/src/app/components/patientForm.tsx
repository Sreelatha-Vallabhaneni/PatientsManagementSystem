"use client";


"use client";

import { useEffect, useRef, useState } from "react";
import api from "../lib/api";
import { Patient } from "@/types/patient";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import { X } from "lucide-react";




interface PatientFormProps {
  patient?: Patient | null;
  onClose: () => void;
  onSave: () => void;
}

export default function PatientForm({ patient, onClose, onSave }: PatientFormProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Populate form on edit
  useEffect(() => {
    if (patient) {
      setForm({
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        email: patient.email || "",
        phoneNumber: patient.phoneNumber || "",
        dob: patient.dob ? patient.dob.slice(0, 10) : "",
      });
    }
  }, [patient]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        dob: new Date(form.dob).toISOString(),
      };
      if (patient) {
        // Update logic
        await api.put(`/patients/${patient.id}`, payload);
        toast.success("Patient updated successfully");
      } else {
        // Create logic
        await api.post("/patients", payload);
        toast.success("Patient added successfully");
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
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





















// import { useEffect, useState } from "react";
// import api from "../lib/api";
// import { Patient } from "@/types/patient";
// import { useQueryClient } from "@tanstack/react-query";


// interface PatientFormProps {
//   patient?: Patient | null;
//   onClose: () => void;
//   onSave: () => void;
// }


// export default function PatientForm({ patient, onClose, onSave }: PatientFormProps)  {
//   const [form, setForm] = useState({
//   //id: "",
//   firstName: "",
//   lastName: "",
//   email: "",
//   phoneNumber: "",
//   dob: "",
// });

//   const queryClient = useQueryClient();

//   useEffect(() => {
//   if (patient) {
//     setForm({
//       //id: patient.id  || "", // <-- Include id for PATCH
//       firstName: patient.firstName || "",
//       lastName: patient.lastName || "",
//       email: patient.email || "",
//       phoneNumber: patient.phoneNumber || "",
//       dob: patient.dob ? patient.dob.slice(0, 10) : "",
//     });
//   }
// }, [patient]);


//   const handleSubmit = async (e: any) => {
//   e.preventDefault();
//   try {
//     const { id, dob, ...rest } = form;

//     const payload = {
//       ...rest,
//       dob: new Date(dob).toISOString(), // ✅ Convert to ISO 8601
//     };

//     if (id) {
//       await api.put(`/patients/${Number(id)}`, payload);
//     } else {
//       await api.post("/patients", payload);
//     }

//     await queryClient.invalidateQueries({ queryKey: ["patients"] });
//     onSave();
//     setForm({
//       id: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       phoneNumber: "",
//       dob: "",
//     });
//   } catch (err) {
//     alert("Something went wrong while saving the patient.");
//     console.error(err);
//   }
// };






// console.log("Updating patient with ID:******", patient, form.id);
//   // const handleSubmit = async (e: any) => {
//   //   e.preventDefault();
//   //   try {
//   //     if (patient?.id) {
//   //       const { firstName, lastName, email, phoneNumber, dob } = form;
//   //       await api.patch(`/patients/${patient.id}`, { firstName, lastName, email, phoneNumber, dob });
//   //     } else {
//   //       await api.post("/patients", form);
//   //     }
//   //     onSave();
//   //     setForm({ firstName: "", lastName: "", email: "", phoneNumber: "", dob: "" });
//   //   } catch (err) {
//   //     console.error("Edit failed", err);
//   //     alert("Something went wrong");
//   //   }
//   // };

//   return (
//     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
//       {Object.entries(form).map(([key, value]) => (
//         <input
//           key={key}
//           className="border p-2 rounded"
//           placeholder={key}
//           value={value}
//           onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//           type={key === "dob" ? "date" : "text"}
//         />
//       ))}
//       <div className="flex justify-center items-center col-span-2">
//         <button className="bg-Royalblue-regular text-lg font-medium tracking-wider font-sans outline-none text-white p-2 rounded-2xl uppercase hover:bg-white hover:text-Royalblue-regular hover:border-2 h-11 w-2/3 hover:border-Royalblue-regular transition-colors transform duration-200 ease-in-out" type="submit">
//           {patient ? "Update Patient" : "Add Patient"}
//         </button>
//       </div>
//     </form>
//   );
// }








// // "use client";
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function PatientForm({ selected, onSuccess }: any) {
// //   const [form, setForm] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phoneNumber: "",
// //     dob: "",
// //   });

// //   useEffect(() => {
// //     if (selected) {
// //       setForm({ ...selected, dob: selected.dob.slice(0, 10) });
// //     }
// //   }, [selected]);

// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem("token");
// //     try {
// //       if (selected?.id) {
// //         await axios.patch(`http://localhost:5001/patients/${selected.id}`, form, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //       } else {
// //         await axios.post("http://localhost:5001/patients", form, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //       }
// //       onSuccess();
// //       setForm({ firstName: "", lastName: "", email: "", phoneNumber: "", dob: "" });
// //     } catch (err) {
// //       alert("Something went wrong");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
// //       {Object.entries(form).map(([key, value]) => (
// //         <input
// //           key={key}
// //           className="border p-2 rounded"
// //           placeholder={key}
// //           value={value}
// //           onChange={(e) => setForm({ ...form, [key]: e.target.value })}
// //           type={key === "dob" ? "date" : "text"}
// //         />
// //       ))}
// //       <button className="col-span-2 bg-green-600 text-white p-2 rounded" type="submit">
// //         {selected ? "Update Patient" : "Add Patient"}
// //       </button>
// //     </form>
// //   );
// // }
