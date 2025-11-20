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
 * Headers MINIMAUX pour contourner la protection InfinityFree
 * On essaie avec le minimum de headers pour éviter la détection
 */
export function getApiHeaders(origin?: string): Record<string, string> {
  // Headers ULTRA-MINIMAUX - juste le strict minimum
  // Certains hébergeurs bloquent les requêtes avec trop de headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  // Essayer avec ou sans User-Agent selon ce qui fonctionne
  // Pour l'instant, on le garde simple
  return headers;
}

