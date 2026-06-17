"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import VideoForm from "@/components/admin/VideoForm";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddVideoPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await axios.post("/api/videos", formData);
      toast.success("Video added successfully!");
      router.push("/admin/videos");
    } catch (error) {
      const errors = error.response?.data?.errors;
      if (errors && errors.length > 0) {
        toast.error(errors.map(e => e.message).join(", "));
      } else {
        toast.error(error.response?.data?.message || "Failed to add video");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1">
        <AdminHeader title="Add Video" />
        <div className="p-6">
          <GlassCard>
            <VideoForm onSubmit={handleSubmit} loading={loading} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}