import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique car on utilise request.headers
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Récupérer les cookies de la requête Next.js
    const cookies = request.headers.get("cookie");
    
    console.log("🍪 Cookies reçus de Next.js:", cookies);

    // Appel au backend PHP avec les cookies et headers pour contourner la protection InfinityFree
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const headers = getApiHeaders(origin);
    headers["Cookie"] = cookies || "";
    
    const response = await fetch(getApiUrl("auth/me.php"), {
      method: "GET",
      headers: headers,
    });

    console.log("📥 Statut /me:", response.status);

    const textResponse = await response.text();
    console.log("📥 Réponse /me:", textResponse);

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("❌ Erreur parsing /me:", textResponse);
      return NextResponse.json(
        { success: false, error: "Non connecté" },
        { status: 401 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Erreur /me:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

