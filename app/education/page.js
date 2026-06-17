"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoCard from "@/components/ui/VideoCard";
import CategoryFilter from "@/components/ui/CategoryFilter";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";

export default function EducationPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const url = category ? `/api/videos?category=${category}` : "/api/videos";
        const res = await axios.get(url);
        setVideos(res.data.data?.videos || res.data.videos || res.data || []);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [category]);

  return (
    <main>
      <Navbar />

      <section className="pt-32 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-accent-gold font-montserrat text-sm tracking-widest uppercase mb-4">
              EDUCATION
            </span>
            <h1 className="font-bebas text-4xl md:text-6xl text-white mb-4">
              Free Trading Content
            </h1>
            <p className="text-gray-400 font-inter text-lg">
              No fluff. Just real market insights.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            active={category}
            onChange={setCategory}
            className="mb-12"
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <motion.div
                  key={video._id || video.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
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
            <div className="text-center py-16">
              <p className="text-gray-400 font-inter text-lg mb-6">
                No content found{category ? ` for "${category}"` : ""}. Check back soon.
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
        </div>
      </section>

      <Footer />
    </main>
  );
}