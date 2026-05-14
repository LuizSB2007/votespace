"use client"; // Necessário para usar o useState

import api from "@/src/api.js";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Ícones de olho
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) return router.push("/hub");

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">VoteSpace</h1>
        <p className="text-gray-500 mb-8">Faça login na sua conta</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 text-left">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Email</span>
            <input
              type="email"
              placeholder="sou@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {/* Botão do Olho */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md cursor-pointer mt-2"
          >
            Fazer Login
          </button>
        </form>

        <div className="mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            Não tem conta?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Registre-se aqui
            </Link>
          </p>
          <Link
            href="/"
            className="block text-xs text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
