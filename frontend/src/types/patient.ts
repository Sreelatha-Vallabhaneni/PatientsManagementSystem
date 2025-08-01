export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}