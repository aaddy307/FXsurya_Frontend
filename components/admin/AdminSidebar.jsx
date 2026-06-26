"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, PlusCircle, Users, UserPlus, LogOut, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const activeLink = sidebarLinks.find((link) => link.href === pathname);
  const currentTitle = activeLink ? activeLink.label : "Admin";

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-bebas text-2xl">
          FX<span className="text-accent-gold">SURYA</span>
          <span className="text-gray-500 text-sm block font-inter">Admin</span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-400 hover:text-white p-1"
          aria-label="Close sidebar menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
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
          onClick={() => {
            setIsOpen(false);
            onLogout();
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-gray-400 hover:text-danger hover:bg-danger/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-inter text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F0F0F] border-b border-[#1A1A1A] flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white p-2 -ml-2"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-bebas text-xl text-white tracking-wide">{currentTitle}</h1>
        </div>
        <Link href="/admin/dashboard" className="font-bebas text-lg">
          FX<span className="text-accent-gold">SURYA</span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <div className="w-64 h-screen fixed top-0 left-0 bg-[#0F0F0F] border-r border-[#1A1A1A] flex flex-col z-30">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Sidebar Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-64 max-w-xs bg-[#0F0F0F] h-full border-r border-[#1A1A1A] flex flex-col z-10 transition-all">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}