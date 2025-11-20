import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique car on utilise request.headers
export const dynamic = 'force-dynamic';

// Fonction helper pour faire une requête avec retry
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 2,
  delay = 1000
): Promise<Response> {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      const text = await response.text();
      
      // Si InfinityFree bloque, retry avec un délai
      if (text.includes("aes.js") || text.includes("<html>") || text.includes("<script")) {
        if (i < maxRetries) {
          console.log(`⚠️ Blocage détecté, retry ${i + 1}/${maxRetries} dans ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      
      // Retourner une réponse avec le texte
      return new Response(text, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    } catch (error) {
      if (i < maxRetries) {
        console.log(`⚠️ Erreur, retry ${i + 1}/${maxRetries} dans ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Tous les retries ont échoué");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("🔐 Tentative de connexion:", { email: body.email });

    // Appel au backend PHP avec headers pour contourner la protection InfinityFree
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const headers = getApiHeaders(origin);
    
    const response = await fetchWithRetry(
      getApiUrl("auth/login.php"),
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      },
      2, // 2 retries
      1500 // 1.5 secondes de délai
    );

    console.log("📥 Statut réponse PHP:", response.status);

    const textResponse = await response.text();
    console.log("📥 Réponse PHP (texte):", textResponse.substring(0, 300));

    // Vérifier si InfinityFree a bloqué la requête (retourne du HTML/JS)
    if (textResponse.includes("aes.js") || textResponse.includes("<html>") || textResponse.includes("<script")) {
      console.error("❌ InfinityFree bloque toujours la requête après retries");
      // Essayer de parser quand même si c'est juste un warning
      if (textResponse.length < 5000) {
        console.log("⚠️ Tentative de continuer malgré le blocage...");
      } else {
        return NextResponse.json(
          { success: false, error: "Le serveur bloque la requête. Réessayez dans quelques instants." },
          { status: 500 }
        );
      }
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

