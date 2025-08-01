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

const fetchPatients = async () => {
  const { data } = await api.get("/patients");
  return data;
};

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    role: string;
  } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const roleAccess = user?.role || "user";

  const {
    data: patients = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const filteredPatients = patients.filter((patient: Patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPatients = filteredPatients.length;
  const totalPages = Math.ceil(totalPatients / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
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
    // PatientForm handles saving; just refresh UI
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Aisel Health
                </h1>
                <p className="text-xs text-gray-500">Patient Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
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
                  location.href = "/login";
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="tracking-wider text-sm font-medium">
                Your Access as{" "}
                <strong className="">
                  <u>ADMIN</u>
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                {user?.role.toLowerCase() === "admin" && (
                  <Button
                    onClick={handleAddPatient}
                    className="flex items-center gap-2"
                  >
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
              role={roleAccess}
              //role={roleAccess || "admin"}
              currentPage={currentPage}
              totalPages={totalPages}
              onEditPatient={handleEditPatient}
              onViewPatient={handleViewPatient}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </CardContent>
        </Card>
      </main>

      {/* Modals */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <PatientForm
            //patient={selectedPatient}
            //onSave={fetchPatients}
            patient={editingPatient}
            onClose={handleCloseForm}
            onSave={handleFormSave}
          />
        </div>
      )}

      {viewingPatient && (
        <PatientDetail patient={viewingPatient} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Dashboard;
