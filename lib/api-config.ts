/**
 * Configuration centralisée pour les appels API
 * Utilise les variables d'environnement pour fonctionner en local et sur Vercel
 */

// URL de l'API PHP backend
// En développement : http://localhost/central6/api
// En production : https://central6rp.rf.gd
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://central6rp.rf.gd';

// URL du site
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

/**
 * Construire l'URL complète d'un endpoint API
 */
export function getApiUrl(endpoint: string): string {
  // Enlever le slash initial si présent
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Enlever le slash final de l'API_URL si présent
  const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  
  return `${cleanApiUrl}/${cleanEndpoint}`;
}

/**
 * Headers pour contourner la protection InfinityFree
 * Simule un navigateur réel pour éviter les blocages
 * IMPORTANT: On utilise le domaine InfinityFree comme Origin/Referer pour éviter le blocage
 */
export function getApiHeaders(origin?: string): Record<string, string> {
  // Utiliser le domaine InfinityFree comme Origin/Referer pour éviter le blocage
  const infinityFreeOrigin = API_URL.replace(/\/$/, '');
  
  // Headers ultra-réalistes pour simuler Chrome le plus récent
  // On fait comme si la requête venait directement du domaine InfinityFree
  return {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": infinityFreeOrigin + "/",
    "Origin": infinityFreeOrigin,
    "Connection": "keep-alive",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  };
}

