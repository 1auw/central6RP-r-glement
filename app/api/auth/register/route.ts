import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-config";

// Forcer le rendu dynamique car on utilise request.headers
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📤 Envoi au backend PHP:", body);

    // Appel au backend PHP (côté serveur, pas de CORS nécessaire)
    const response = await fetch(getApiUrl("auth/register.php"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("📥 Statut réponse PHP:", response.status);

    const textResponse = await response.text();
    console.log("📥 Réponse PHP (texte):", textResponse);

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("❌ Erreur parsing JSON:", textResponse);
      return NextResponse.json(
        { success: false, error: "Réponse invalide du serveur: " + textResponse },
        { status: 500 }
      );
    }

    console.log("📥 Réponse PHP (parsed):", data);

    // Créer la réponse Next.js
    const nextResponse = NextResponse.json(data);

    // Transférer les cookies de session depuis PHP
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
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

