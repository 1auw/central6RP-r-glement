import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📤 Envoi au backend PHP:", body);

    // Appel au backend PHP avec headers pour contourner la protection InfinityFree
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const response = await fetch(getApiUrl("auth/register.php"), {
      method: "POST",
      headers: getApiHeaders(origin),
      body: JSON.stringify(body),
      credentials: "include",
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

