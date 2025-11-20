import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique car on utilise request.headers
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Récupérer les cookies de la requête Next.js
    const cookies = request.headers.get("cookie");
    
    // Utiliser le proxy PHP pour contourner InfinityFree
    const headers = getApiHeaders();
    if (cookies) {
      headers["Cookie"] = cookies;
    }
    
    const proxyUrl = getApiUrl("proxy.php?endpoint=auth/me.php");
    const response = await fetch(proxyUrl, {
      method: "GET",
      headers: headers,
    });

    const textResponse = await response.text();

    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      // Si le parsing échoue, retourner une réponse 200 avec success: false
      // pour éviter l'erreur 401 dans la console
      return NextResponse.json(
        { success: false, error: "Non connecté" },
        { status: 200 }
      );
    }

    // Toujours retourner 200, même si le backend PHP retourne 401
    // Cela évite l'erreur 401 dans la console du navigateur
    // Le frontend vérifiera data.success pour savoir si l'utilisateur est connecté
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur /me:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

