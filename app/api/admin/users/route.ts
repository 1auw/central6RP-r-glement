import { NextRequest, NextResponse } from "next/server";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");
    const origin = request.headers.get("origin") || request.headers.get("referer") || undefined;
    const headers = getApiHeaders(origin);
    if (cookies) {
      headers["Cookie"] = cookies;
    }

    const response = await fetch(getApiUrl("admin/users.php"), {
      method: "GET",
      headers: headers,
    });

    const textResponse = await response.text();
    let data;

    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: "Réponse invalide du serveur" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

