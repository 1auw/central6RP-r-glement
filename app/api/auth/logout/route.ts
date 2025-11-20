import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-config";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Appel au backend PHP (côté serveur, pas de CORS nécessaire)
    const cookies = request.headers.get("cookie");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (cookies) {
      headers["Cookie"] = cookies;
    }
    
    const response = await fetch(getApiUrl("auth/logout.php"), {
      method: "POST",
      headers: headers,
    });

    const data = await response.json();

    // Créer la réponse Next.js
    const nextResponse = NextResponse.json(data);

    // Transférer les cookies de session depuis PHP (suppression)
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      nextResponse.headers.set("set-cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

