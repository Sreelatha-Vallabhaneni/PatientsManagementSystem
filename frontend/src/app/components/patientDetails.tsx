"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types/patient';
import { Calendar, Mail, Phone, MapPin, User, Heart, X } from 'lucide-react';

interface PatientDetailProps {
  patient: Patient;
  onClose: () => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getGenderBadge = (gender: string) => {
    const colors = {
      male: 'bg-blue-100 text-blue-800',
      female: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[gender as keyof typeof colors] || colors.other;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {patient.firstName} {patient.lastName}
          </CardTitle>
          <CardDescription>
            Patient Details - {calculateAge(patient.dob)} years old
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{patient.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{patient.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date of Birth</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(patient.dob)} ({calculateAge(patient.dob)} years old)
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Gender</p>
                  <Badge variant="secondary" className={getGenderBadge(patient.gender)}>
                    {patient.gender}
                  </Badge>
                </div>
              </div> */}
            </div>

            {/* <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{patient.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Emergency Contact</p>
                  <p className="text-sm text-muted-foreground">{patient.emergencyContact}</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Medical History</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {patient.medicalHistory || 'No medical history recorded.'}
              </p>
            </div>
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Created</p>
              <p className="text-sm">{formatDate(patient.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Last Updated</p>
              <p className="text-sm">{formatDate(patient.updatedAt)}</p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetail;