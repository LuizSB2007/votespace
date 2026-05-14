import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-8 text-white font-sans">
      {/* Header / Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 tracking-tight">VoteSpace</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          A plataforma moderna e segura para criar e gerenciar votações em tempo
          real
        </p>
      </div>

      {/* Features Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/20 transition-all cursor-default">
          <div className="text-4xl mb-4">🗳️</div>
          <h2 className="text-xl font-semibold mb-2">Votações Fáceis</h2>
          <p className="text-sm opacity-80">
            Crie votações em segundos com uma interface intuitiva
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/20 transition-all cursor-default">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-xl font-semibold mb-2">Múltiplos Usuários</h2>
          <p className="text-sm opacity-80">
            Convide amigos e colegas para participar
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-white/20 transition-all cursor-default">
          <div className="text-4xl mb-4">⚡</div>
          <h2 className="text-xl font-semibold mb-2">
            Resultados Instantâneos
          </h2>
          <p className="text-sm opacity-80">Veja os resultados em tempo real</p>
        </div>
      </div>

      {/* Action Buttons with Navigation */}
      <div className="flex gap-4 mb-16">
        <Link href="/login">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-sky-100 transition-all shadow-lg cursor-pointer">
            Fazer Login
          </button>
        </Link>

        <Link href="/register">
          <button className="bg-blue-600 border border-blue-400 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg cursor-pointer">
            Criar Conta
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-sm opacity-70">
        <p>VoteSpace © 2026 - Votações seguras e transparentes</p>
      </footer>
    </div>
  );
}
