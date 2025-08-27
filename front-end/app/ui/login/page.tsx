"use client";

import { useState } from "react";
import api from "@/app/lib/api";
import Cookies from 'js-cookie';
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await api.post("/auth/login", {email, password});
        Cookies.set('access_token', response.data.access_token, {
            expires: 1,       // 1 ngày
            sameSite: 'lax',   // cross-site
            secure: false,     // true nếu dùng HTTPS
        });
        alert(response.data.message || "Đăng nhập thành công");
    } catch (error: any) {
        console.error(error);
        const message =
        error.response?.data?.message || "Đăng nhập thất bại";
        alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>
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
          Đăng nhập
        </button>
        {/* Nút chuyển sang trang đăng ký */}
        <p className="text-center mt-4 text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <Link href="/ui/signup" className="text-blue-500 hover:underline">
            Đăng ký
        </Link>
        </p>
      </form>
    </div>
  );
}
