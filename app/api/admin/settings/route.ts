import { NextRequest, NextResponse } from "next/server";
import { getApiUrl } from "@/lib/api-config";

// Forcer le rendu dynamique
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (cookies) {
      headers["Cookie"] = cookies;
    }

    const response = await fetch(getApiUrl("admin/settings.php"), {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookies = request.headers.get("cookie");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (cookies) {
      headers["Cookie"] = cookies;
    }

    const response = await fetch(getApiUrl("admin/settings.php"), {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
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

