"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchEnrollments();
  }, [router]);

  const fetchEnrollments = async () => {
    try {
      const res = await axios.get("/api/enrollment");
      setEnrollments(res.data.data?.enrollments || res.data.enrollments || res.data || []);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "plan", label: "Plan", render: (val) => (
      <span className="px-2 py-1 rounded-full text-xs bg-accent-gold/20 text-accent-gold capitalize">
        {val}
      </span>
    )},
    { key: "amount", label: "Amount", render: (val) => val ? `₹${Number(val).toLocaleString()}` : "-" },
    { key: "paymentId", label: "Payment ID", render: (val) => (
      <span className="text-gray-400 text-xs">{val || "-"}</span>
    )},
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <span className={`px-2 py-1 rounded-full text-xs capitalize ${
          val === "paid" ? "bg-success/20 text-success" :
          val === "pending" ? "bg-yellow-500/20 text-yellow-500" :
          "bg-danger/20 text-danger"
        }`}>
          {val}
        </span>
      ),
    },
    { key: "createdAt", label: "Date", render: (val) => formatDate(val) },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1">
        <AdminHeader title="Enrollments" />
        <div className="p-6">
          <p className="text-gray-400 font-inter text-sm mb-6">
            {enrollments.length} enrollment{enrollments.length !== 1 ? "s" : ""} total
          </p>

          <GlassCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <DataTable columns={columns} data={enrollments} />
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
