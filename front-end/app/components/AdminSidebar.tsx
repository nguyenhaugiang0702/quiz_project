"use client";
import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="flex flex-col space-y-2">
        <Link href="/admin" className="hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link href="/admin/quizzes" className="hover:bg-gray-200 p-2 rounded">Quizzes</Link>
        <Link href="/admin/users" className="hover:bg-gray-200 p-2 rounded">Users</Link>
        <Link href="/admin/settings" className="hover:bg-gray-200 p-2 rounded">Settings</Link>
      </nav>
    </aside>
  );
}
