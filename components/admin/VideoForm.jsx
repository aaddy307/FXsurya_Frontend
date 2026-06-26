"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { detectPlatform, getRelativeTime } from "@/lib/utils";
import VideoCard from "@/components/ui/VideoCard";
import Button from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const platforms = [
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
  { label: "Twitter/X", value: "twitter" },
  { label: "Other", value: "other" },
];

const categories = [
  { label: "Forex", value: "forex" },
  { label: "Crypto", value: "crypto" },
  { label: "Mindset", value: "mindset" },
  { label: "Prop Firms", value: "propfirm" },
  { label: "General", value: "general" },
];

export default function VideoForm({ onSubmit, loading, initialData }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    url: "",
    platform: "other",
    category: "",
    thumbnail: "",
    isPublished: true,
    createdAt: "",
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await axios.post("/api/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.data?.url || res.data.url;
      setForm((prev) => ({ ...prev, thumbnail: imageUrl }));
      toast.success("Thumbnail uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        url: initialData.url || "",
        platform: initialData.platform || "other",
        category: initialData.category || "",
        thumbnail: initialData.thumbnail || "",
        isPublished: initialData.isPublished !== undefined ? initialData.isPublished : true,
        createdAt: initialData.createdAt ? new Date(initialData.createdAt).toISOString().split("T")[0] : "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (form.url) {
      const detected = detectPlatform(form.url);
      if (detected && detected !== "other") {
        setForm((prev) => ({ ...prev, platform: detected }));
      }
    }
  }, [form.url]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.url.trim()) newErrors.url = "URL is required";
    if (!form.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-inter text-sm mb-2">
            Video Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border text-white font-inter focus:outline-none transition-colors",
              errors.title ? "border-danger" : "border-[#1A1A1A] focus:border-accent-gold"
            )}
            placeholder="e.g., How to Pass Prop Firm Challenge"
          />
          {errors.title && (
            <p className="text-danger text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="block text-white font-inter text-sm mb-2">
            Description *
          </label>
          <div className="relative">
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={300}
              rows={4}
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border text-white font-inter focus:outline-none transition-colors resize-none",
                errors.description ? "border-danger" : "border-[#1A1A1A] focus:border-accent-gold"
              )}
              placeholder="Brief description of the video content..."
            />
            <span className="absolute bottom-3 right-3 text-gray-500 text-xs">
              {form.description.length}/300
            </span>
          </div>
          {errors.description && (
            <p className="text-danger text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.description}
            </p>
          )}
        </div>

        <div>
          <label className="block text-white font-inter text-sm mb-2">
            Social Media / Video URL *
          </label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border text-white font-inter focus:outline-none transition-colors",
              errors.url ? "border-danger" : "border-[#1A1A1A] focus:border-accent-gold"
            )}
            placeholder="Paste Instagram reel, YouTube, or any video link"
          />
          <p className="text-gray-500 text-xs mt-1">
            Platform will be auto-detected from URL
          </p>
          {errors.url && (
            <p className="text-danger text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.url}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-inter text-sm mb-2">
              Platform *
            </label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
            >
              {platforms.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white font-inter text-sm mb-2">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border text-white font-inter focus:outline-none transition-colors",
                errors.category ? "border-danger" : "border-[#1A1A1A] focus:border-accent-gold"
              )}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-danger text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.category}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-white font-inter text-sm mb-2">
            Thumbnail Image (optional)
          </label>
          
          <div className="flex items-center gap-4">
            {form.thumbnail ? (
              <div className="relative w-24 h-16 rounded-xl bg-[#0A0A0A] overflow-hidden border border-border group">
                <Image
                  src={form.thumbnail}
                  alt="Thumbnail preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, thumbnail: "" }))}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-danger font-semibold transition-opacity"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="w-24 h-16 rounded-xl bg-[#0A0A0A] border border-dashed border-[#1A1A1A] flex items-center justify-center text-gray-500 text-xs">
                No image
              </div>
            )}
            
            <label className={cn(
              "px-4 py-2.5 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] text-white text-xs font-semibold font-inter transition-all cursor-pointer hover:border-accent-gold hover:text-accent-gold flex items-center gap-2",
              uploading && "opacity-50 cursor-not-allowed"
            )}>
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <span>Upload Image</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-gray-500 text-xs mt-1.5">
            Leave blank to use platform default
          </p>
        </div>

        <div>
          <label className="block text-white font-inter text-sm mb-2">
            Publish Date (optional)
          </label>
          <input
            type="date"
            value={form.createdAt}
            onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border border-[#1A1A1A] text-white font-inter focus:outline-none focus:border-accent-gold transition-colors"
          />
          <p className="text-gray-500 text-xs mt-1">
            Leave blank to use current date and time
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, isPublished: !form.isPublished })}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              form.isPublished ? "bg-accent-gold" : "bg-[#1A1A1A]"
            )}
          >
            <div
              className={cn(
                "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                form.isPublished ? "left-7" : "left-1"
              )}
            />
          </button>
          <span className="text-white font-inter text-sm">
            {form.isPublished ? "Publish immediately" : "Save as draft"}
          </span>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          {initialData ? "Update Video" : "Add Video"}
        </Button>
      </form>

      <div>
        <h3 className="text-white font-inter text-sm mb-4">Live Preview</h3>
        <div className="sticky top-24">
          <VideoCard
            title={form.title || "Video Title"}
            description={form.description || "Video description will appear here..."}
            thumbnail={form.thumbnail || null}
            platform={form.platform}
            category={form.category}
            url={form.url}
            date={form.createdAt ? new Date(form.createdAt).toISOString() : new Date().toISOString()}
          />
        </div>
      </div>
    </div>
  );
}
