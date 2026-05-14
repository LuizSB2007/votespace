"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Instale com: npm install lucide-react

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4 font-sans text-gray-800">
      {/* Register Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">VoteSpace</h1>
        <p className="text-gray-500 mb-8">Crie sua conta</p>

        <form className="flex flex-col gap-4 text-left">
          {/* Nome Completo */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">
              Nome Completo
            </span>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Email</span>
            <input
              type="email"
              name="email"
              placeholder="sou@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </label>

          {/* Senha */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {/* Confirmar Senha */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">
              Confirmar Senha
            </span>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md cursor-pointer mt-4"
          >
            Criar Conta
          </button>
        </form>

        {/* Links de Apoio */}
        <div className="mt-8 space-y-3">
          <p className="text-sm text-gray-600">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-bold hover:underline cursor-pointer"
            >
              Faça login aqui
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
