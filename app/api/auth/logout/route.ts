import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Appel au backend PHP avec headers pour contourner la protection InfinityFree
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const cookies = request.headers.get("cookie");
    const headers = getApiHeaders(origin);
    if (cookies) {
      headers["Cookie"] = cookies;
    }
    
    const response = await fetch(getApiUrl("auth/logout.php"), {
      method: "POST",
      headers: headers,
      credentials: "include",
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

