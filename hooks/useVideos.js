"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/axios";

export default function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/videos");
      setVideos(res.data.data?.videos || res.data.videos || res.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch videos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addVideo = async (videoData) => {
    try {
      const res = await axios.post("/api/videos", videoData);
      await fetchVideos();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const updateVideo = async (id, videoData) => {
    try {
      const res = await axios.patch(`/api/videos/${id}`, videoData);
      await fetchVideos();
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      await fetchVideos();
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, error, fetchVideos, addVideo, updateVideo, deleteVideo };
}