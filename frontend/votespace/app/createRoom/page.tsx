"use client";

import { SubmitEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import api from "@/src/api";
import Modal from "../components/modal";
import validation from "@/src/validation";

export default function CreateRoomPage() {
  const router = useRouter();

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  // Estados do formulário
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [options, setOptions]: [any, any] = useState([]);
  const [currentOption, setCurrentOption] = useState("");
  const [editingIndex, setEditingIndex]: [any, any] = useState(null);

  useEffect(() => {
    const valid = async () => {
      if (!(await validation(localStorage.getItem("token") as string)))
        router.push("/login");
    };
    valid();
  }, [router]);

  const showError = (title: string, message: string) => {
    setModalContent({ title, message });
    setIsModalOpen(true);
  };

  const handleAddOption = () => {
    if (!currentOption.trim()) return;

    if (editingIndex !== null) {
      const updatedOptions: any = [...options];
      updatedOptions[editingIndex] = currentOption;
      setOptions(updatedOptions);
      setEditingIndex(null);
    } else {
      setOptions([...options, currentOption]);
    }
    setCurrentOption("");
  };

  //Cria uma sala e suas opções
  const handleCreateRoom = async (e: any) => {
    e.preventDefault();

    // Validação com Modal em vez de Alert
    if (options.length < 2) {
      showError(
        "Opções Insuficientes",
        "Uma votação precisa de pelo menos 2 opções para que os usuários possam escolher.",
      );
      return;
    }

    try {
      const room: any = await api.post(
        "/room",
        {
          name,
          description,
          isPublic,
          ownerId: localStorage.getItem("userID"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      options.map(async (option: any) => {
        await api.post(
          `/room/option/`,
          {
            roomId: room.data.id,
            text: option,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      });
      router.push("/hub");
    } catch (error) {
      showError(
        "Erro na Criação",
        "Não foi possível criar a sala. Verifique sua conexão ou tente novamente mais tarde.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-6 font-sans">
      {/* Componente do Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/hub"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Criar Nova Sala</h1>
        </div>

        <form onSubmit={handleCreateRoom} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-bold text-gray-700 ml-1">
                Nome da Sala
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Melhor framework JS"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-gray-700 ml-1">
                Descrição
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite a descrição da sala"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 h-24 resize-none"
                required
              />
            </label>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <input
              type="checkbox"
              id="public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-5 h-5 accent-blue-600 cursor-pointer"
            />
            <label
              htmlFor="public"
              className="text-gray-700 font-medium cursor-pointer"
            >
              Sala pública?
            </label>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <span className="text-sm font-bold text-gray-700 ml-1">
              Opções de Voto
            </span>
            <div className="flex gap-2 mt-2 mb-4">
              <input
                type="text"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                placeholder="Digite uma opção..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-bold cursor-pointer"
              >
                {editingIndex !== null ? (
                  <Save size={18} />
                ) : (
                  <Plus size={18} />
                )}
              </button>
            </div>

            <div className="space-y-2">
              {options.map((opt: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100"
                >
                  <span className="text-blue-800 font-medium">{opt}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentOption(options[index]);
                        setEditingIndex(index);
                      }}
                      className="text-gray-400 hover:text-blue-600 cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setOptions(
                          options.filter((_: any, i: number) => i !== index),
                        )
                      }
                      className="text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 shadow-lg cursor-pointer"
          >
            Criar Sala de Votação
          </button>
        </form>
      </div>
    </div>
  );
}
