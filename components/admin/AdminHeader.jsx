"use client";

export default function AdminHeader({ title }) {
  return (
    <header className="h-16 bg-[#0F0F0F] border-b border-[#1A1A1A] flex items-center justify-between px-6 md:flex hidden">
      <h1 className="font-bebas text-2xl text-white">{title}</h1>
    </header>
  );
}
