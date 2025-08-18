"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false); // Track successful signup

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      console.log("Signup successful:", userCredential.user);
      setSignedUp(true);
    } catch (error: any) {
      alert(error.message);
      console.error("Signup error:", error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Create Your Account
        </h1>

        {!signedUp ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              Sign Up
            </Button>
          </form>
        ) : (
          <p className="text-center mt-4 text-green-700">
            Signup successful! Go to{" "}
            <Link href="/about" className="underline">
              About Page
            </Link>
          </p>
        )}

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
