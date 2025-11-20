import { NextRequest, NextResponse } from 'next/server';
import { getApiUrl, getApiHeaders } from '@/lib/api-config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Appel au backend PHP avec headers pour contourner la protection InfinityFree
    const response = await fetch(getApiUrl('stats.php'), {
      method: 'GET',
      headers: getApiHeaders(),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('❌ Erreur HTTP stats:', response.status, response.statusText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const textResponse = await response.text();
    
    // Vérifier si InfinityFree a bloqué la requête
    if (textResponse.includes("aes.js") || textResponse.includes("<html>") || textResponse.includes("<script")) {
      console.error('❌ InfinityFree bloque la requête stats');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur serveur',
          stats: {
            players_online: 0,
            max_players: 32,
            total_users: 0,
            server_status: 'Hors ligne',
            shop_items: 5
          }
        },
        { status: 500 }
      );
    }
    
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error('❌ Erreur parsing JSON stats:', textResponse.substring(0, 200));
      return NextResponse.json(
        { success: false, error: 'Réponse invalide du serveur' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Erreur stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur serveur',
        message: error instanceof Error ? error.message : String(error),
        stats: {
          players_online: 0,
          max_players: 32,
          total_users: 0,
          server_status: 'Hors ligne',
          shop_items: 5
        }
      },
      { status: 500 }
    );
  }
}

