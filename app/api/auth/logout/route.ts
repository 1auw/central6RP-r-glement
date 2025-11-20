import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Utiliser le proxy PHP pour contourner InfinityFree
    const cookies = request.headers.get("cookie");
    const headers = getApiHeaders();
    if (cookies) {
      headers["Cookie"] = cookies;
    }
    
    const proxyUrl = getApiUrl("proxy.php?endpoint=auth/logout.php");
    const response = await fetch(proxyUrl, {
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

