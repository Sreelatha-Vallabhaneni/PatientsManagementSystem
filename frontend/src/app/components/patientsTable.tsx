"use client";

import { Patient } from "@/types/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Edit, Trash2, Eye } from 'lucide-react';
import api from "../lib/api";
import { useState, useEffect } from "react";

interface PatientsTableProps {
  patients: Patient[];
  role: "admin" | "user";
  status?: "active" | "inactive" | string;
  onEditPatient?: (patient: Patient) => void;
  onViewPatient?: (patient: Patient) => void;
  onDeletePatient: (id: string, name: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PatientsTable({
  patients,
  role,
  onEditPatient,
  onViewPatient,
  currentPage,
  totalPages,
  onPageChange 
}: PatientsTableProps) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: string } | null>(null);

   // Load user from localStorage on mount
      useEffect(() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
          }
      }, []);
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/patients/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      deleteMutation.mutate(id);
    }
  };
 
console.log("role-user", user, role, patients, "total pages", totalPages)

  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
             <TableHead>Phone No.</TableHead>
            {/* <TableHead>Status</TableHead> */}
            {/* {role === "admin" && <th className="border p-2">Actions</th>} */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.firstName} {p.lastName}</TableCell>
              <TableCell>{p.email}</TableCell>
              <TableCell>{p.phoneNumber}</TableCell>
              <TableCell className="hidden lg:table-cell">{formatDate(p.dob)}</TableCell>
              {/* <TableCell>
                <Badge variant={p.status === "active" ? "default" : "outline"}>
                  {p.status ?? "unknown"}
                </Badge>
              </TableCell> */}
              <TableCell className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => onViewPatient?.(p)} className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                </Button>
                {role.toLowerCase() === "admin" &&  (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => onEditPatient?.(p)} className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm"  onClick={() => handleDelete(p.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      {patients.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No patients found. {user?.role.toLowerCase() === 'admin' && 'Add a new patient to get started.'}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const shouldShow = 
                  page === 1 || 
                  page === totalPages || 
                  Math.abs(page - currentPage) <= 1;
                
                if (!shouldShow && page === 2 && currentPage > 4) {
                  return (
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                if (!shouldShow && page === totalPages - 1 && currentPage < totalPages - 3) {
                  return (
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                if (!shouldShow) return null;
                
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};














// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import api from "../lib/api";
// import PatientForm from "./patientForm";


// const fetchPatients = async () => {
//   const { data } = await api.get("/patients");
//   return data;
// };

// export default function PatientsTable({ role }: { role: "admin" | "user"; }) {
//   const queryClient = useQueryClient();
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const { data: patients = [], isLoading } = useQuery({
//     queryKey: ["patients"],
//     queryFn: fetchPatients,
//   });

//   const deletePatient = useMutation({
//     mutationFn: async (id: number) => {
//       await api.delete(`/patients/${id}`);
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
//   });

//   if (isLoading) return <p className="text-center mt-12">Loading...</p>;

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Patients</h1>
//         {/* <button
//           onClick={() => {
//             localStorage.clear();
//             location.href = "/login";
//           }}
//           className="text-sm text-red-600 underline"
//         >
//           Logout
//         </button> */}
//       </div>
//       {role === "admin" && (
//         <PatientForm onSuccess={() => queryClient.invalidateQueries({ queryKey: ["patients"] })} selected={selectedPatient} />
//       )}
//       <table className="w-full table-auto border border-gray-300 mt-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">First Name</th>
//             <th className="border p-2">Last Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">DOB</th>
//             {role === "admin" && <th className="border p-2">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((p: any) => (
//             <tr key={p.id} className="text-center">
//               <td className="border p-2">{p.firstName}</td>
//               <td className="border p-2">{p.lastName}</td>
//               <td className="border p-2">{p.email}</td>
//               <td className="border p-2">{p.phoneNumber}</td>
//               <td className="border p-2">{new Date(p.dob).toLocaleDateString()}</td>
//               {role === "admin" && (
//                 <td className="border p-2 space-x-2">
//                   <button className="text-blue-600 underline" onClick={() => setSelectedPatient(p)}>
//                     Edit
//                   </button>
//                   <button className="text-red-600 underline" onClick={() => deletePatient.mutate(p.id)}>
//                     Delete
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


















// "use client";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import PatientForm from "./patientForm";


// const fetchPatients = async () => {
//   const token = localStorage.getItem("token");
//   const { data } = await axios.get("http://localhost:5001/patients", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return data;
// };

// export default function PatientsTable() {
//   const queryClient = useQueryClient();
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const { data: patients = [], isLoading } = useQuery({
//     queryKey: ["patients"],
//     queryFn: fetchPatients,
//   });

//   const deletePatient = useMutation({
//     mutationFn: async (id: number) => {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5001/patients/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
//   });

//   if (isLoading) return <p className="text-center mt-12">Loading...</p>;

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Patients</h1>
//       <PatientForm onSuccess={() => queryClient.invalidateQueries({ queryKey: ["patients"] })} selected={selectedPatient} />
//       <table className="w-full table-auto border border-gray-300 mt-6">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">First Name</th>
//             <th className="border p-2">Last Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">DOB</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {patients.map((p: any) => (
//             <tr key={p.id} className="text-center">
//               <td className="border p-2">{p.firstName}</td>
//               <td className="border p-2">{p.lastName}</td>
//               <td className="border p-2">{p.email}</td>
//               <td className="border p-2">{p.phoneNumber}</td>
//               <td className="border p-2">{new Date(p.dob).toLocaleDateString()}</td>
//               <td className="border p-2 space-x-2">
//                 <button
//                   className="text-blue-600 underline"
//                   onClick={() => setSelectedPatient(p)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-600 underline"
//                   onClick={() => deletePatient.mutate(p.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }