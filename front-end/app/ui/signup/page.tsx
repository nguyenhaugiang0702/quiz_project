"use client";

import { useState } from "react";
import api from "@/app/lib/api";
import Link from 'next/link'

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await api.post("/auth/signup", {username, email, password});
        alert(response.data.message || "Đăng ký thành công");
    } catch (error: any) {
        console.error(error);
        const message =
        error.response?.data?.message || "Đăng ký thất bại";
        alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng ký</h1>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          className="w-full p-2 mb-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng ký
        </button>
        {/* Nút chuyển sang trang đăng nhập */}
        <p className="text-center mt-4 text-sm text-gray-600">
        Nếu có tài khoản{' '}
        <Link href="/ui/login" className="text-blue-500 hover:underline">
            Đăng nhập
        </Link>
        </p>
      </form>
    </div>
  );
}
