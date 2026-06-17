"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/utils";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.data.token);
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 500);
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed. Check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-bebas text-4xl">
            FX<span className="text-accent-gold">SURYA</span>
          </h1>
          <p className="text-gray-500 font-inter text-sm mt-2">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-inter text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#1F1F1F] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-white font-inter text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#1F1F1F] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" loading={loading} className="w-full">
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}