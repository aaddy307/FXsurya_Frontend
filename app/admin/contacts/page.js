"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import axios from "@/lib/axios";
import { formatDate, truncate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

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
  
  const filteredContacts = normalizedContacts.filter((c) => {
    const matchesFilter = filter === "all" || c.type === filter;
    const matchesSearch =
      !searchQuery ||
      (c.name && c.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.message && c.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-6">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search contacts by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-light border border-border text-white text-sm font-inter focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-400 font-inter text-xs uppercase tracking-wider">Filter:</span>
              <div className="flex flex-wrap gap-2">
                {["all", "general", "partnership", "student"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                      filter === type
                        ? "bg-accent-gold text-black"
                        : "bg-surface border border-border text-gray-400 hover:text-white hover:border-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <div className="flex flex-col">
                <DataTable
                  columns={columns}
                  data={paginatedContacts}
                  expandable
                  expandableContent={renderExpanded}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredContacts.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}