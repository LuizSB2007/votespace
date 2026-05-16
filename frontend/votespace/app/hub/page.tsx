"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Plus, Search, Vote } from "lucide-react";
import api from "@/src/api";
import validation from "@/src/validation";

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("Usuário");

  // Proteção de Rota e Busca de Dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Busca se o usuario esta logado
        const userData = {
          token: localStorage.getItem("token"),
          name: localStorage.getItem("userName"),
        };

        if (!validation(userData.token as string)) router.push("/login");

        // busca salas do banco via Axios
        const response = await api.get("/room", {
          headers: {
            Authorization: `Bear ${localStorage.getItem("token")}`,
          },
        });

        setRooms(response.data);

        setUser(userData.name ?? user);
      } catch (error) {
        console.error("Não autenticado ou erro na busca", error);
        // Se não houver token ou der erro 401, volta para o login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpa a sessão
    router.push("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      {/* Navbar Superior */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-md flex items-center justify-between text-white">
        <div className="flex items-center gap-2 font-bold text-xl ml-4">
          <Vote size={28} />
          <span>VoteSpace</span>
        </div>

        {/* Barra de Pesquisa Central */}
        <div className="hidden md:flex relative w-1/3">
          <input
            type="text"
            placeholder="Pesquisar salas..."
            className="w-full bg-white/20 border border-white/30 rounded-full py-2 px-4 placeholder:text-white/70 focus:outline-none focus:bg-white/30 transition-all"
          />
          <Search className="absolute right-4 top-2.5 opacity-70" size={18} />
        </div>

        {/* Ações do Usuário */}
        <div className="flex items-center gap-4 mr-4">
          <button
            onClick={() => router.push("/createRoom")}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all text-sm"
          >
            <Plus size={18} /> Criar Sala
          </button>
          <span className="hidden sm:inline text-sm font-medium">{user}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition-all cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Bem-vindo, {user}! 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Escolha uma sala para votar ou crie uma nova
          </p>
        </header>

        {/* Grid de Cards Dinâmico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room: any) => (
            <div
              key={room.id}
              className="bg-white border-l-4 border-blue-500 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between max-w-[450px] max-h-[200px]"
            >
              <div>
                <h5 className="text-xl font-bold text-gray-800 mb-2">
                  {room.name}
                </h5>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-xs font-mono text-blue-500 font-semibold bg-blue-50 px-2 py-1 rounded mr-1 line-clamp-1">
                  #{room.slug}
                </span>
                <Link
                  href={`/room/${room.slug}`}
                  className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline group"
                >
                  Participar
                </Link>
              </div>
            </div>
          ))}

          {/* Estado Vazio (Caso não tenha salas) */}
          {rooms.length === 0 && (
            <p className="text-gray-400 italic">
              Nenhuma sala encontrada no momento.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
