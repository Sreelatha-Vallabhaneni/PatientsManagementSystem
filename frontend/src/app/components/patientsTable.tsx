"use client";

import { Patient } from "@/types/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, Trash2, Eye } from "lucide-react";
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
  onPageChange,
}: PatientsTableProps) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);

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
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="text-sm tracking-wider">
              <TableHead className="text-Royalblue-dark font-semibold">
                Name
              </TableHead>
              <TableHead className="text-Royalblue-dark font-semibold">
                Email
              </TableHead>
              <TableHead className="text-Royalblue-dark font-semibold">
                Phone No.
              </TableHead>
              <TableHead className="text-Royalblue-dark font-semibold hidden lg:table-cell">
                D.O.B
              </TableHead>
              <TableHead className="text-Royalblue-dark font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients?.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.firstName} {p.lastName}
                </TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.phoneNumber}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(p.dob)}
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewPatient?.(p)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {role.toLowerCase() === "admin" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditPatient?.(p)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(p.id.toString())}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
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
          No patients found.{" "}
          {user?.role.toLowerCase() === "admin" &&
            "Add a new patient to get started."}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    currentPage > 1 && onPageChange(currentPage - 1)
                  }
                  className={
                    currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
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

                  if (
                    !shouldShow &&
                    page === totalPages - 1 &&
                    currentPage < totalPages - 3
                  ) {
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
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                  }
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
