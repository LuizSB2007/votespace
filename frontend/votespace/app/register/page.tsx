"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"; // Instale com: npm install lucide-react
import api from "@/src/api";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  //Estados para visualização da senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Dados do usuário para cadastro
  const [email, setEmail]: [string, any] = useState("");
  const [password, setPassword]: [string, any] = useState("");
  const [name, setName]: [string, any] = useState("");

  const router = useRouter();

  //Exibe erro na modal
  const showError = (title: string, message: string) => {
    setModalContent({ title, message });
    setIsModalOpen(true);
  };

  //Cria um novo usuário
  async function handleRegister(e: any) {
    e.preventDefault();
    if (!name || !email || !password)
      return showError(
        "Campos não preenchidos",
        "Preencha todos os campos para se cadastrar",
      );
    const response = await api.post("/auth/register", {
      name: name,
      email: email,
      password: password,
    });


    localStorage.setItem("token", response.data.token.token);
    localStorage.setItem("userID", response.data.user.id);
    localStorage.setItem("userName", response.data.user.name);

    router.push("/hub");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4 font-sans text-gray-800">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />

      {/* Register Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">VoteSpace</h1>
        <p className="text-gray-500 mb-8">Crie sua conta</p>

        <form className="flex flex-col gap-4 text-left">
          {/* Nome Completo */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Nome</span>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Email</span>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sou@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </label>

          {/* Senha */}
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold text-gray-700 ml-1">Senha</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            onClick={handleRegister}
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
