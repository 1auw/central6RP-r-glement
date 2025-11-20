import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique car on utilise request.headers
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("🔐 Tentative de connexion:", { email: body.email });

    // Appel au backend PHP avec headers pour contourner la protection InfinityFree
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const response = await fetch(getApiUrl("auth/login.php"), {
      method: "POST",
      headers: getApiHeaders(origin),
      body: JSON.stringify(body),
    });

    console.log("📥 Statut réponse PHP:", response.status);

    const textResponse = await response.text();
    console.log("📥 Réponse PHP (texte):", textResponse);

    // Vérifier si InfinityFree a bloqué la requête (retourne du HTML/JS)
    if (textResponse.includes("aes.js") || textResponse.includes("<html>") || textResponse.includes("<script")) {
      console.error("❌ InfinityFree bloque la requête:", textResponse.substring(0, 200));
      return NextResponse.json(
        { success: false, error: "Le serveur bloque la requête. Vérifiez la configuration." },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("❌ Erreur parsing JSON:", textResponse.substring(0, 500));
      return NextResponse.json(
        { success: false, error: "Réponse invalide du serveur" },
        { status: 500 }
      );
    }

    console.log("📥 Réponse PHP (parsed):", data);

    // Créer la réponse Next.js
    const nextResponse = NextResponse.json(data);

    // Transférer les cookies de session depuis PHP
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      console.log("🍪 Cookie reçu:", setCookieHeader);
      nextResponse.headers.set("set-cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    console.error("❌ Erreur globale:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

