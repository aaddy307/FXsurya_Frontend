"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import axios from "@/lib/axios";
import { formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    videos: 0,
    contacts: 0,
    enrollments: 0,
    proposals: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [videosRes, contactsRes, enrollmentsRes] = await Promise.all([
        axios.get("/api/videos"),
        axios.get("/api/contact"),
        axios.get("/api/enrollment"),
      ]);

      const videosData = videosRes.data?.data;
      const contactsData = contactsRes.data?.data;
      const enrollmentsData = enrollmentsRes.data?.data;

      const videos = videosData?.videos || videosData || [];
      const contacts = contactsData?.contacts || contactsData || [];
      const enrollments = enrollmentsData?.enrollments || enrollmentsData || [];

      const proposals = Array.isArray(contacts) ? contacts.filter((c) => c.type === "partnership").length : 0;

      setStats({
        videos: Array.isArray(videos) ? videos.length : 0,
        contacts: Array.isArray(contacts) ? contacts.length : 0,
        enrollments: Array.isArray(enrollments) ? enrollments.length : 0,
        proposals,
      });

      setRecentContacts(Array.isArray(contacts) ? contacts.slice(-5).reverse() : []);
      setRecentEnrollments(Array.isArray(enrollments) ? enrollments.slice(-5).reverse() : []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const contactColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "type", label: "Type", render: (val) => (
      <span className="px-2 py-1 rounded-full text-xs bg-accent-gold/20 text-accent-gold capitalize">
        {val}
      </span>
    )},
    { key: "createdAt", label: "Date", render: (val) => formatDate(val) },
  ];

  const enrollmentColumns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "plan", label: "Plan" },
    { key: "amount", label: "Amount", render: (val) => val ? `₹${val}` : "-" },
    { key: "status", label: "Status", render: (val) => (
      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
        val === "paid" ? "bg-success/20 text-success" :
        val === "pending" ? "bg-yellow-500/20 text-yellow-500" :
        "bg-danger/20 text-danger"
      }`}>
        {val}
      </span>
    )},
    { key: "createdAt", label: "Date", render: (val) => formatDate(val) },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 min-w-0 pt-16 md:pt-0">
        <AdminHeader title="Dashboard" />
        <div className="p-4 md:p-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-surface-light rounded w-1/2 mb-4" />
                  <div className="h-8 bg-surface-light rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <GlassCard>
                  <p className="text-gray-400 font-inter text-sm mb-2">Total Videos</p>
                  <p className="font-bebas text-4xl text-accent-gold">{stats.videos}</p>
                </GlassCard>
                <GlassCard>
                  <p className="text-gray-400 font-inter text-sm mb-2">Total Contacts</p>
                  <p className="font-bebas text-4xl text-accent-gold">{stats.contacts}</p>
                </GlassCard>
                <GlassCard>
                  <p className="text-gray-400 font-inter text-sm mb-2">Total Enrollments</p>
                  <p className="font-bebas text-4xl text-accent-gold">{stats.enrollments}</p>
                </GlassCard>
                <GlassCard>
                  <p className="text-gray-400 font-inter text-sm mb-2">Proposals</p>
                  <p className="font-bebas text-4xl text-accent-gold">{stats.proposals}</p>
                </GlassCard>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard>
                  <h3 className="font-bebas text-xl text-white mb-4">Recent Contacts</h3>
                  <DataTable columns={contactColumns} data={recentContacts} />
                </GlassCard>
                <GlassCard>
                  <h3 className="font-bebas text-xl text-white mb-4">Recent Enrollments</h3>
                  <DataTable columns={enrollmentColumns} data={recentEnrollments} />
                </GlassCard>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}