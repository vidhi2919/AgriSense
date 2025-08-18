"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      setLoggedIn(true);
    } catch (error: any) {
      alert(error.message);
      console.error("Login error:", error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Sign In
        </h1>

        {!loggedIn ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              Sign In
            </Button>
          </form>
        ) : (
          <p className="text-center mt-4 text-green-700">
            Login successful! Go to{" "}
            <Link href="/about" className="underline">
              About Page
            </Link>
          </p>
        )}

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-700 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </main>
  );
}
