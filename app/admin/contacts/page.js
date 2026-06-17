"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";
import { formatDate, truncate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedContact, setExpandedContact] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchContacts();
  }, [router]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/api/contact");
      setContacts(res.data.data?.contacts || res.data.contacts || res.data || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const normalizedContacts = Array.isArray(contacts) ? contacts : [];
  const filteredContacts = filter === "all"
    ? normalizedContacts
    : normalizedContacts.filter((c) => c.type === filter);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "type", label: "Type", render: (val) => (
      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
        val === "partnership" ? "bg-purple-500/20 text-purple-400" :
        val === "student" ? "bg-blue-500/20 text-blue-400" :
        "bg-gray-500/20 text-gray-400"
      }`}>
        {val}
      </span>
    )},
    { key: "message", label: "Message", render: (val) => (
      <span className="text-gray-400 max-w-xs truncate block">{truncate(val, 50)}</span>
    )},
    { key: "createdAt", label: "Date", render: (val) => formatDate(val) },
  ];

  const renderExpanded = (row) => (
    <div className="space-y-4">
      <div>
        <p className="text-gray-400 text-xs uppercase mb-1">Full Message</p>
        <p className="text-white font-inter">{row.message}</p>
      </div>
      {row.phone && (
        <div>
          <p className="text-gray-400 text-xs uppercase mb-1">Phone</p>
          <p className="text-white font-inter">{row.phone}</p>
        </div>
      )}
      {row.company && (
        <div>
          <p className="text-gray-400 text-xs uppercase mb-1">Company</p>
          <p className="text-white font-inter">{row.company}</p>
        </div>
      )}
      {row.capitalRange && (
        <div>
          <p className="text-gray-400 text-xs uppercase mb-1">Capital Range</p>
          <p className="text-white font-inter">{row.capitalRange}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 min-w-0 pt-16 md:pt-0">
        <AdminHeader title="Contacts" />
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <p className="text-gray-400 font-inter text-sm">
              {filteredContacts.length} contact{filteredContacts.length !== 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {["all", "general", "partnership", "student"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-colors ${
                    filter === type
                      ? "bg-accent-gold text-black"
                      : "bg-surface text-gray-400 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredContacts}
                expandable
                expandableContent={renderExpanded}
              />
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}