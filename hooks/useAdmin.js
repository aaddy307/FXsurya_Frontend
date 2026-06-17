"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return { isAuthenticated, isLoading, logout };
}