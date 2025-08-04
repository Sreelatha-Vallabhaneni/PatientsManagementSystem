"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Users,
  UserPlus,
  LogOut,
  Search,
  Heart,
  Shield,
  Eye,
} from "lucide-react";

import { Patient } from "@/types/patient";

import PatientsTable from "../components/patientsTable";
import PatientForm from "../components/patientForm";
import PatientDetail from "../components/patientDetails";

import useMediaQuery from "../hooks/useMediaQuery";

//Define user interface
interface User {
  firstName: string;
  lastName: string;
  role: "user" | "admin"; // explicitly set the role type
}



// Fetch all patients
const fetchPatients = async (): Promise<Patient[]> => {
  const { data } = await api.get("/patients");
  return data;
};

const Dashboard: React.FC = () => {
  // const [user, setUser] = useState<{
  //   firstName: string;
  //   lastName: string;
  //   role: string;
  // } | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;
  const isMobile = useMediaQuery("(max-width: 430px)");

  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);
  }
}, []);

  // Load user info from localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser);
  //     setUser(parsedUser);
  //   }
  // }, []);

  const roleAccess = user?.role || "user";

  const {
    data: patients = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  // Filter patients based on search
  const filteredPatients = patients.filter((patient: Patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPatients = filteredPatients.length;
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setViewingPatient(patient);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleCloseDetail = () => {
    setViewingPatient(null);
  };

  const handleFormSave = () => {
    // After save, close form and refetch patients
    setShowForm(false);
    refetch(); // Ensure latest data
  };
  const handleDeletePatient = (patientId: number) => {
  // Implement delete logic here, e.g., API call to delete patient
  // Then refetch or update local state accordingly
  console.log("Deleting patient with id:", patientId);
  // Example: refetch();
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header
        className={`${
          isMobile ? "py-3" : ""
        } bg-white border-b border-gray-200 shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div
              className={`flex items-center gap-2 ${
                isMobile ? "flex-col" : "flex-row"
              }`}
            >
              <div className="p-2 bg-blue-600 rounded-lg">
                <Heart
                  className={` ${isMobile && "h-3 w-3"} h-5 w-5 text-white`}
                />
              </div>
              <div>
                <h1
                  className={`font-bold text-gray-900 ${
                    isMobile ? "text-base" : "text-xl"
                  }`}
                >
                  Aisel Health
                </h1>
                <p className="text-xs text-gray-500">Patient Management</p>
              </div>
            </div>

            {/* User Info & Logout */}
            <div
              className={`flex items-center ${
                isMobile ? "gap-2 flex-col-reverse" : "gap-4"
              }`}
            >
              {user && (
                <>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {user.role.toLowerCase() === "admin" ? (
                      <Shield className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                    {user.role.toLowerCase() === "admin"
                      ? "Administrator"
                      : "User"}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {user.firstName} {user.lastName}
                  </span>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.clear();
                  location.href = "/";
                }}
                className="text-sm flex items-center gap-2 font-bold"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Total Patients Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-wider text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.length}</div>
              <p className="tracking-wider text-sm text-muted-foreground">
                Registered in the system
              </p>
            </CardContent>
          </Card>

          {/* Access Role Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-wider text-sm font-medium">
                Your Access as{" "}
                <strong>
                  <u>
                    {user?.role.toLowerCase() === "admin"
                      ? "Admin"
                      : "User"}
                  </u>
                </strong>
              </CardTitle>
              {user?.role.toLowerCase() === "admin" ? (
                <Shield className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-wider">
                {user?.role.toLowerCase() === "admin" ? "Full" : "View Only"}
              </div>
              <p className="tracking-wider text-sm text-muted-foreground">
                {user?.role.toLowerCase() === "admin"
                  ? "Create, edit, delete patients"
                  : "View patient information"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <div className="flex tracking-wider flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Patients</CardTitle>
                <CardDescription>
                  Manage patient records and information
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                {/* Add Patient Button (admin only) */}
                {user?.role.toLowerCase() === "admin" && (
                  <Button onClick={handleAddPatient} className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add Patient
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <PatientsTable
              patients={currentPatients}
              role={user?.role as "user" | "admin"} // cast explicitly
              //role={roleAccess}
              currentPage={currentPage}
              totalPages={totalPages}
              onEditPatient={handleEditPatient}
              onViewPatient={handleViewPatient}
              onPageChange={(page) => setCurrentPage(page)}
              onDeletePatient={handleDeletePatient}
            />
          </CardContent>
        </Card>
      </main>

      {/* Patient Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <PatientForm
            patient={editingPatient}
            onClose={handleCloseForm}
            onSave={handleFormSave}
          />
        </div>
      )}

      {/* Patient Detail Modal */}
      {viewingPatient && (
        <PatientDetail patient={viewingPatient} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Dashboard;
