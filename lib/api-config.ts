/**
 * Configuration centralisée pour les appels API
 * Utilise les variables d'environnement pour fonctionner en local et sur Vercel
 */

// URL de l'API PHP backend
// En développement : http://localhost/central6/api
// En production : https://api.votresite.com ou l'URL de votre VPS
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/central6/api';

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

