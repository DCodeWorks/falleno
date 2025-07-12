import Link from "next/link";
import {
  FolderKanban,
  Zap,
  Share2,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white text-slate-800">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <FolderKanban className="text-blue-600" />
            <span>CuratoreApp</span>
          </div>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors hidden sm:block"
          >
            Accedi
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Semplifica la Gestione dei Beni Fallimentari.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Dimentica i fogli Excel e le email infinite. Cataloga i beni in
              pochi minuti, genera schede di vendita professionali con un click
              e velocizza la liquidazione.
            </p>
            <div className="mt-10 flex justify-center items-center gap-4">
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-transform hover:scale-105"
              >
                Inizia Ora{" "}
                <ArrowRight className="inline-block ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Tutto ciò di cui hai bisogno. Niente di superfluo.
              </h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                Abbiamo creato uno strumento focalizzato su due problemi chiave
                per rendere il tuo lavoro più efficiente.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-5">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Catalogazione Veloce
                </h3>
                <p className="text-slate-600">
                  Usa il tuo smartphone direttamente durante il sopralluogo.
                  Carica foto, descrizioni e stime in tempo reale. Niente più
                  lavoro doppio in ufficio.
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-5">
                  <Share2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Schede di Vendita in 1 Click
                </h3>
                <p className="text-slate-600">
                  Genera una pagina web pubblica e professionale per ogni bene.
                  Condividila via email o WhatsApp per raggiungere subito i
                  potenziali acquirenti.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Un Flusso di Lavoro Ultra-Semplice
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 items-start">
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-blue-200">1</h3>
                <h4 className="text-xl font-bold mt-2">Fotografa e Cataloga</h4>
                <p className="text-slate-500 mt-2">
                  Direttamente sul posto, aggiungi i beni all'inventario
                  digitale.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-blue-200">2</h3>
                <h4 className="text-xl font-bold mt-2">Genera la Scheda</h4>
                <p className="text-slate-500 mt-2">
                  Con un solo click, trasformi i dati in una pagina di vendita.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-5xl font-extrabold text-blue-200">3</h3>
                <h4 className="text-xl font-bold mt-2">Condividi e Vendi</h4>
                <p className="text-slate-500 mt-2">
                  Invia il link pubblico agli interessati e ricevi le offerte.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="container mx-auto px-6 text-center text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} CuratoreApp. Un PoC realizzato con
            passione.
          </p>
        </div>
      </footer>
    </div>
  );
}
