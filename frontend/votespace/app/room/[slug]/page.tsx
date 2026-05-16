"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import api from "@/src/api";
import Modal from "@/app/components/modal";

interface Props {
  params: Promise<{ slug: string | string[] }>;
}

interface VoteData {
  text: string;
  contagem: number;
}

interface RoomOption {
  id: string;
  text: string;
}

export default function RoomPage({ params }: Props) {
  const { slug } = use(params);

  const router = useRouter();

  // Estados do Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const [room, setRoom] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState<RoomOption | null>(null);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [votosData, setVotosData] = useState<VoteData[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const totalVotos = votosData.reduce((acc, curr) => acc + curr.contagem, 0);

  //Exibe mensagem na modal
  const showMessage = (title: string, message: string) => {
    setModalContent({ title, message });
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // =========================
        // BUSCA SALA
        // =========================

        const responseRoom = await api.get(`/room/slug/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const roomData = responseRoom.data[0];

        // =========================
        // BUSCA OPÇÕES
        // =========================

        const responseOptions = await api.get(`/room/option/${roomData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const options: RoomOption[] = responseOptions.data.map((opt: any) => ({
          id: opt.id,
          text: opt.text,
        }));

        // =========================
        // BUSCA VOTOS
        // =========================

        const responseVotes = await api.get(`/room/vote/room/${roomData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // =========================
        // CONTAGEM DE VOTOS
        // =========================

        const votosCount: any = {};

        // Inicializa todas opções com 0 votos
        responseOptions.data.forEach((opt: any) => {
          votosCount[opt.id] = {
            text: opt.text,
            contagem: 0,
          };
        });

        // Conta votos
        responseVotes.data.forEach((vote: any) => {
          if (votosCount[vote.optionId]) {
            votosCount[vote.optionId].contagem++;
          }
        });

        // Converte para array
        const votosFormatados: VoteData[] = Object.values(votosCount);

        setVotosData(votosFormatados);

        // =========================
        // DEFINE SALA
        // =========================

        setRoom({
          id: roomData.id,
          title: roomData.name,
          description: roomData.description,
          options,
        });
      } catch (error) {
        console.error("Erro ao buscar sala:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [slug, token]);

  const VotingChart = () => (
    <div className="mt-6 space-y-3">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        Resultados Parciais ({totalVotos} votos)
      </h2>

      {votosData.map((item, index) => {
        const porcentagem =
          totalVotos > 0 ? Math.round((item.contagem / totalVotos) * 100) : 0;

        return (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-gray-500">
              <span>{item.text}</span>
              <span>{porcentagem}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${porcentagem}%` }}
              />
            </div>

            <div className="text-[10px] text-gray-400">
              {item.contagem} voto(s)
            </div>
          </div>
        );
      })}
    </div>
  );

  const createVote = async (
    optionId: string | undefined,
    roomId: string,
    vote: string,
  ) => {
    await api.post(
      "/room/vote",
      { optionId, roomId, userId: localStorage.getItem("userID") },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    showMessage(
      "Voto computado",
      `O sua opção de voto: ${vote} foi salva, a página irá atualizar em 4 segundos`,
    );
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Carregando...
      </div>
    );

  return (
    <div className="min-h-screen md:h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center p-4 md:p-8 font-sans">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />

      {/* Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform animate-in zoom-in-95 duration-200 text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Confirmar Voto?
            </h3>

            <p className="text-gray-600 mb-6 text-sm">
              Opção:{" "}
              <span className="font-bold text-blue-600">
                {selectedOption?.text}
              </span>
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 bg-gray-100 py-3 rounded-xl font-bold cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  createVote(
                    selectedOption?.id,
                    room.id,
                    selectedOption?.text as string,
                  );

                  setIsConfirmModalOpen(false);
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-5xl md:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/hub"
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>

            <h1 className="text-xl font-bold text-gray-900 truncate max-w-[180px] md:max-w-md">
              {room.title}
            </h1>
          </div>

          <span className="text-[10px] bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded-full uppercase tracking-tighter">
            Ativa
          </span>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          {/* Coluna esquerda */}
          <div className="w-full md:w-2/5 p-6 bg-gray-50/50 border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
            <h2 className="text-xs font-bold text-gray-400 uppercase mb-3">
              Sobre esta sala
            </h2>

            <p className="text-gray-600 text-sm leading-relaxed italic border-l-2 border-blue-200 pl-3">
              "{room.description}"
            </p>

            <div className="hidden md:block">
              <VotingChart />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="w-full md:w-3/5 p-6 flex flex-col overflow-visible md:overflow-hidden">
            <div className="md:overflow-y-auto pr-0 md:pr-2 space-y-3 custom-scrollbar">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Escolha uma alternativa:
              </span>

              {room.options.map((option: RoomOption, index: number) => (
                <div
                  key={index}
                  data-option-id={option.id}
                  onClick={() => setSelectedOption(option)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedOption?.id === option.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-100 bg-white hover:border-blue-200"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      selectedOption?.id === option.id
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {option.text}
                  </span>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption?.id === option.id
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption?.id === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Rodapé */}
            <div className="pt-6 md:border-t border-gray-100 mt-4">
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                disabled={!selectedOption}
                className={`w-full py-4 rounded-xl font-bold text-base shadow-lg transition-all ${
                  selectedOption
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Confirmar Voto
              </button>

              <div className="md:hidden pb-4">
                <VotingChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
