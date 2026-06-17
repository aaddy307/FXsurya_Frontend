"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, PlusCircle, Users, UserPlus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/videos", icon: Video, label: "Videos" },
  { href: "/admin/videos/add", icon: PlusCircle, label: "Add Video" },
  { href: "/admin/contacts", icon: Users, label: "Contacts" },
  { href: "/admin/enrollments", icon: UserPlus, label: "Enrollments" },
];

export default function AdminSidebar({ onLogout }) {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen bg-[#0F0F0F] border-r border-[#1A1A1A] flex flex-col">
      <div className="p-6">
        <Link href="/admin/dashboard" className="font-bebas text-2xl">
          FX<span className="text-accent-gold">SURYA</span>
          <span className="text-gray-500 text-sm block font-inter">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all",
              pathname === link.href
                ? "bg-accent-gold/10 text-accent-gold border border-accent-gold/30"
                : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
            )}
          >
            <link.icon className="w-5 h-5" />
            <span className="font-inter text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1A1A1A]">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:text-danger hover:bg-danger/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-inter text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}