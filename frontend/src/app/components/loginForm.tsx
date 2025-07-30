"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Heart } from 'lucide-react';
import api from '../lib/api';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  //const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        setIsLoading(true);
        setError('');
    try {
      const { data } = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      router.push("/patients");
        if (!data.access_token) {
                setError('Invalid username or password');
              }
          } catch (err) {
          setError('An error occurred during login');
        } finally {
          setIsLoading(false);
        }
//     } catch (err) {
//       alert("Login failed. Check credentials.");
//     }
   };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const success = await login(email, password);
  //     if (!success) {
  //       setError('Invalid username or password');
  //     }
  //   } catch (err) {
  //     setError('An error occurred during login');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Aisel Health</h1>
          <p className="text-gray-600 mt-2">Patient Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the patient management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">UserName</Label>
                <Input
                  id="userName"
                  type="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your userName"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Demo Credentials:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Admin:</strong> admin / admin123</p>
                <p><strong>User:</strong> user / user123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;









// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "../lib/api";

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/auth/login", { username, password });
//       localStorage.setItem("token", data.access_token);
//       localStorage.setItem("role", data.role);
//       router.push("/");
//     } catch (err) {
//       alert("Login failed. Check credentials.");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-24 p-4 bg-white shadow-md rounded">
//       <h2 className="text-xl font-semibold mb-4">Login</h2>
//       <input
//         className="w-full p-2 mb-2 border rounded"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         className="w-full p-2 mb-4 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
//         Login
//       </button>
//     </form>
//   );
// }