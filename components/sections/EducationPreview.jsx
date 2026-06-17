"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoCard from "@/components/ui/VideoCard";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";

export default function EducationPreview() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/videos?limit=3");
        setVideos(res.data.data?.videos || res.data.videos || res.data || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="EDUCATION"
          heading="Free Trading Content"
          subtext="Watch before you invest in anything"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-surface-light" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-surface-light rounded w-3/4" />
                  <div className="h-3 bg-surface-light rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video._id || video.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <VideoCard
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  platform={video.platform}
                  category={video.category}
                  url={video.url}
                  date={video.createdAt}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 font-inter mb-6">
              No content yet. Check back soon.
            </p>
            <a
              href="https://instagram.com/fxupdates_official"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">Follow on Instagram</Button>
            </a>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/education">
            <Button variant="ghost">View All Free Content →</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}