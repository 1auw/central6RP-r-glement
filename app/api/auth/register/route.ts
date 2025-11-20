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

    console.log("📤 Envoi au backend PHP:", body);

    // Appel au backend PHP avec headers MINIMAUX
    const headers = getApiHeaders();
    const url = getApiUrl("auth/register.php");
    
    console.log("🔗 URL appelée:", url);
    console.log("📤 Headers envoyés:", headers);
    
    // Essayer SANS retry d'abord pour voir la réponse exacte
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    console.log("📥 Statut réponse PHP:", response.status);

    const textResponse = await response.text();
    
    // LOG COMPLET pour debug
    console.log("📥 Statut HTTP:", response.status);
    console.log("📥 Longueur réponse:", textResponse.length);
    console.log("📥 Début réponse:", textResponse.substring(0, 500));
    console.log("📥 Headers réponse:", Object.fromEntries(response.headers.entries()));

    // Vérifier si InfinityFree a bloqué la requête (retourne du HTML/JS)
    const isBlocked = textResponse.includes("aes.js") || 
                      textResponse.includes("<html>") || 
                      textResponse.includes("<script") ||
                      textResponse.includes("InfinityFree") ||
                      textResponse.trim().startsWith("<");

    if (isBlocked) {
      console.error("❌ BLOQUÉ PAR INFINITYFREE - Réponse complète:", textResponse);
      return NextResponse.json(
        { 
          success: false, 
          error: "Le serveur bloque la requête. Vérifiez les logs serveur pour plus de détails.",
          debug: process.env.NODE_ENV === 'development' ? textResponse.substring(0, 1000) : undefined
        },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("❌ Erreur parsing JSON - Réponse complète:", textResponse);
      return NextResponse.json(
        { 
          success: false, 
          error: "Réponse invalide du serveur",
          debug: process.env.NODE_ENV === 'development' ? textResponse.substring(0, 1000) : undefined
        },
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

