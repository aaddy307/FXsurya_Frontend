"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState({ open: false, enrollment: null });
  const [editLoading, setEditLoading] = useState(false);
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

  const handleUpdate = async (id, updatedData) => {
    setEditLoading(true);
    try {
      await axios.patch(`/api/enrollment/${id}`, updatedData);
      toast.success("Enrollment updated successfully");
      setEditModal({ open: false, enrollment: null });
      fetchEnrollments();
    } catch (error) {
      console.error("Failed to update enrollment:", error);
      toast.error("Failed to update enrollment");
    } finally {
      setEditLoading(false);
    }
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
    { key: "razorpayPaymentId", label: "Payment ID", render: (val) => (
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 min-w-0 pt-16 md:pt-0">
        <AdminHeader title="Enrollments" />
        <div className="p-4 md:p-6">
          <p className="text-gray-400 font-inter text-sm mb-6">
            {enrollments.length} enrollment{enrollments.length !== 1 ? "s" : ""} total
          </p>

          <GlassCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <DataTable
                columns={columns}
                data={enrollments}
                onEdit={(enrollment) => setEditModal({ open: true, enrollment })}
              />
            )}
          </GlassCard>
        </div>
      </div>

      {editModal.open && editModal.enrollment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-6 md:p-8 relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setEditModal({ open: false, enrollment: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-10"
            >
              ✕
            </button>
            <h3 className="font-bebas text-3xl text-white mb-6 shrink-0">Edit Enrollment</h3>
            <div className="overflow-y-auto flex-1 pr-2 space-y-4">
              <div>
                <label className="block text-gray-400 font-inter text-xs uppercase tracking-wider mb-2">
                  Name
                </label>
                <p className="text-white font-inter text-sm bg-[#0A0A0A] px-4 py-3 rounded-xl border border-[#1A1A1A]">
                  {editModal.enrollment?.name || ""}
                </p>
              </div>
              <div>
                <label className="block text-gray-400 font-inter text-xs uppercase tracking-wider mb-2">
                  Email
                </label>
                <p className="text-white font-inter text-sm bg-[#0A0A0A] px-4 py-3 rounded-xl border border-[#1A1A1A]">
                  {editModal.enrollment?.email || ""}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-inter text-xs uppercase tracking-wider mb-2">
                    Plan
                  </label>
                  <p className="text-white font-inter text-sm bg-[#0A0A0A] px-4 py-3 rounded-xl border border-[#1A1A1A] capitalize">
                    {editModal.enrollment?.plan || ""}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-400 font-inter text-xs uppercase tracking-wider mb-2">
                    Amount
                  </label>
                  <p className="text-white font-inter text-sm bg-[#0A0A0A] px-4 py-3 rounded-xl border border-[#1A1A1A]">
                    ₹{editModal.enrollment?.amount ? Number(editModal.enrollment.amount).toLocaleString() : "0"}
                  </p>
                </div>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  await handleUpdate(editModal.enrollment?._id, {
                    razorpayPaymentId: formData.get("razorpayPaymentId"),
                    status: formData.get("status"),
                  });
                }}
                className="space-y-4 pt-4 border-t border-[#1A1A1A]"
              >
                <div>
                  <label className="block text-white font-inter text-sm mb-2">
                    Payment ID
                  </label>
                  <input
                    type="text"
                    name="razorpayPaymentId"
                    defaultValue={editModal.enrollment?.razorpayPaymentId || ""}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="e.g. pay_N1x2y3z4"
                  />
                </div>

                <div>
                  <label className="block text-white font-inter text-sm mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    defaultValue={editModal.enrollment?.status || "pending"}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Unpaid / Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={editLoading}
                  className="w-full py-3 px-4 rounded-xl bg-accent-gold hover:bg-accent-gold/90 text-[#0A0A0A] font-inter font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {editLoading ? "Updating..." : "Update Enrollment"}
                </button>
              </form>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
