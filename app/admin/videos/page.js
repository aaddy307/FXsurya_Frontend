"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import GlassCard from "@/components/ui/GlassCard";
import DataTable from "@/components/admin/DataTable";
import Button from "@/components/ui/Button";
import VideoForm from "@/components/admin/VideoForm";
import Pagination from "@/components/ui/Pagination";
import axios from "@/lib/axios";
import { formatDate, getRelativeTime, getErrorMessage } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, video: null });
  const [editModal, setEditModal] = useState({ open: false, video: null });
  const [editLoading, setEditLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchVideos();
  }, [router]);

  useEffect(() => {
    setCurrentPage(1);
  }, [platformFilter, categoryFilter, statusFilter, searchQuery]);

  const fetchVideos = async () => {
    try {
      const res = await axios.get("/api/videos?admin=true");
      setVideos(res.data.data?.videos || res.data.videos || res.data || []);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const handleToggle = async (video) => {
    try {
      await axios.patch(`/api/videos/${video._id}`, { isPublished: !video.isPublished });
      toast.success(video.isPublished ? "Video unpublished" : "Video published");
      fetchVideos();
    } catch (error) {
      toast.error("Failed to update video");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.video) return;
    try {
      await axios.delete(`/api/videos/${deleteModal.video._id}`);
      toast.success("Video deleted");
      setDeleteModal({ open: false, video: null });
      fetchVideos();
    } catch (error) {
      toast.error("Failed to delete video");
    }
  };

  const handleUpdate = async (formData) => {
    if (!editModal.video) return;
    setEditLoading(true);
    try {
      await axios.patch(`/api/videos/${editModal.video._id}`, formData);
      toast.success("Video updated successfully");
      setEditModal({ open: false, video: null });
      fetchVideos();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update video"));
    } finally {
      setEditLoading(false);
    }
  };

  const normalizedVideos = Array.isArray(videos) ? videos : [];

  const filteredVideos = normalizedVideos.filter((v) => {
    const matchesPlatform = platformFilter === "all" || v.platform?.toLowerCase() === platformFilter;
    const matchesCategory = categoryFilter === "all" || v.category?.toLowerCase() === categoryFilter;
    
    let matchesStatus = true;
    if (statusFilter === "published") matchesStatus = v.isPublished === true;
    else if (statusFilter === "draft") matchesStatus = v.isPublished !== true;

    const matchesSearch =
      !searchQuery ||
      (v.title && v.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (v.description && v.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPlatform && matchesCategory && matchesStatus && matchesSearch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: "thumbnail",
      label: "Thumbnail",
      render: (val, row) => (
        <div className="w-20 h-12 rounded-lg bg-surface-light overflow-hidden relative">
          {val ? (
            <Image src={val} alt="" fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              -
            </div>
          )}
        </div>
      ),
    },
    { key: "title", label: "Title", render: (val) => (
      <span className="text-white max-w-xs truncate block">{val}</span>
    )},
    { key: "platform", label: "Platform", render: (val) => (
      <span className="px-2 py-1 rounded-full text-xs bg-surface text-gray-300 capitalize">
        {val}
      </span>
    )},
    { key: "category", label: "Category", render: (val) => val ? (
      <span className="px-2 py-1 rounded-full text-xs bg-accent-gold/20 text-accent-gold">
        {val}
      </span>
    ) : "-" },
    { key: "createdAt", label: "Date", render: (val) => formatDate(val) },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0A0A0A]">
      <AdminSidebar onLogout={handleLogout} />
      <div className="flex-1 min-w-0 pt-16 md:pt-0">
        <AdminHeader title="Videos" />
        <div className="p-4 md:p-6">
          <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center mb-6">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search videos by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#161616] border border-border text-white text-sm font-inter focus:outline-none focus:border-accent-gold transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-[#0F0F0F] border border-border text-white text-xs font-inter focus:outline-none focus:border-accent-gold transition-colors cursor-pointer"
                >
                  <option value="all">All Platforms</option>
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="other">Other</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-[#0F0F0F] border border-border text-white text-xs font-inter focus:outline-none focus:border-accent-gold transition-colors cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="forex">Forex</option>
                  <option value="crypto">Crypto</option>
                  <option value="mindset">Mindset</option>
                  <option value="propfirm">Prop Firms</option>
                  <option value="general">General</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-[#0F0F0F] border border-border text-white text-xs font-inter focus:outline-none focus:border-accent-gold transition-colors cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <Button size="sm" onClick={() => router.push("/admin/videos/add")}>
                Add New Video
              </Button>
            </div>
          </div>

          <GlassCard className="p-0 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : (
              <div className="flex flex-col">
                <DataTable
                  columns={columns}
                  data={paginatedVideos}
                  onToggle={handleToggle}
                  onEdit={(video) => setEditModal({ open: true, video })}
                  onDelete={(video) => setDeleteModal({ open: true, video })}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredVideos.length}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-6">
            <h3 className="font-bebas text-2xl text-white mb-4">Delete Video?</h3>
            <p className="text-gray-400 font-inter mb-6">
              Are you sure you want to delete &ldquo;{deleteModal.video.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setDeleteModal({ open: false, video: null })}
              >
                Cancel
              </Button>
              <Button variant="danger" className="flex-1" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </GlassCard>
        </div>
      )}

      {editModal.open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-4xl w-full p-6 md:p-8 my-4 relative flex flex-col max-h-[90vh]">
            <button
              onClick={() => setEditModal({ open: false, video: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl z-10"
            >
              ✕
            </button>
            <h3 className="font-bebas text-3xl text-white mb-6 shrink-0">Edit Video</h3>
            <div className="overflow-y-auto flex-1 pr-2">
              <VideoForm
                initialData={editModal.video}
                onSubmit={handleUpdate}
                loading={editLoading}
              />
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}