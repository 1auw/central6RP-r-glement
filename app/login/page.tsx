"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { getApiUrl } from "@/lib/api-config";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = getApiUrl("auth/login.php");
      console.log("🔗 URL appelée:", apiUrl);
      
      // Appel direct au backend PHP depuis le navigateur pour éviter la protection InfinityFree
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.email,
          password: formData.password,
        }),
        credentials: "include",
      });

      console.log("📥 Statut réponse:", res.status, res.statusText);
      const textResponse = await res.text();
      console.log("📥 Réponse brute:", textResponse.substring(0, 500));
      
      let data;
      
      try {
        data = JSON.parse(textResponse);
        console.log("✅ Données parsées:", data);
      } catch (e) {
        // Si ce n'est pas du JSON, c'est probablement la protection InfinityFree
        console.error("❌ Erreur parsing JSON:", e);
        console.error("❌ Réponse complète:", textResponse);
        
        if (textResponse.includes("aes.js") || textResponse.includes("location.href")) {
          setError("Le serveur bloque la requête. Vérifiez la configuration CORS sur InfinityFree.");
        } else if (textResponse.includes("404")) {
          setError("Fichier non trouvé. Vérifiez que les fichiers PHP sont bien uploadés sur InfinityFree.");
        } else if (textResponse.includes("403")) {
          setError("Accès refusé. Vérifiez les permissions des fichiers sur InfinityFree.");
        } else {
          setError(`Erreur serveur: ${textResponse.substring(0, 200)}`);
        }
        return;
      }

      if (data.success) {
        router.push("/profile");
      } else {
        setError(data.error || "Erreur de connexion");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Background lines diagonales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full bg-white/[0.02]"
            style={{
              top: `${i * 5}%`,
              transform: "rotate(-45deg)",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-sm">
            <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
            <p className="text-gray-400 mb-8">
              Connectez-vous à votre compte Central 6RP
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold py-3 px-6 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Pas encore de compte ?{" "}
                <Link
                  href="/register"
                  className="text-[#2a7cff] hover:text-[#1e5fd4] transition-colors"
                >
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

