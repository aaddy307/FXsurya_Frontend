"use client";

export default function AdminHeader({ title }) {
  return (
    <header className="h-16 bg-[#0F0F0F] border-b border-[#1A1A1A] hidden md:flex items-center justify-between px-6">
      <h1 className="font-bebas text-2xl text-white">{title}</h1>
    </header>
  );
}
