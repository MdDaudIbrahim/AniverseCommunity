import { Anime, JikanResponse, Character, Staff, Review, Recommendation } from '@/lib/types/anime';

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

// Rate limiting helper - Jikan API has 60 requests per minute, 3 requests per second
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 334; // ~3 requests per second

async function rateLimitedFetch(url: string, retries = 2) {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
  }
  
  lastRequestTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } as any, // Cache for 1 hour
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Rate limited, wait longer and retry
        console.log(`Rate limited, waiting 2 seconds before retry... (${retries} retries left)`);
        await delay(2000);
        return rateLimitedFetch(url, retries - 1);
      }
      throw new Error(`Jikan API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error: any) {
    if (error.name === 'AbortError' && retries > 0) {
      console.log(`Request timeout, retrying... (${retries} retries left)`);
      await delay(1000);
      return rateLimitedFetch(url, retries - 1);
    }
    throw error;
  }
}

// Get top anime
export async function getTopAnime(page: number = 1, limit: number = 25): Promise<JikanResponse<Anime[]>> {
  const url = `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}`;
  return rateLimitedFetch(url);
}

// Get seasonal anime
export async function getSeasonalAnime(year?: number, season?: string): Promise<JikanResponse<Anime[]>> {
  const now = new Date();
  const currentYear = year || now.getFullYear();
  const currentSeason = season || getCurrentSeason();
  
  const url = `${JIKAN_API_BASE}/seasons/${currentYear}/${currentSeason}`;
  return rateLimitedFetch(url);
}

// Get current season
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month >= 1 && month <= 3) return 'winter';
  if (month >= 4 && month <= 6) return 'spring';
  if (month >= 7 && month <= 9) return 'summer';
  return 'fall';
}

// Get currently airing anime
export async function getAiringAnime(page: number = 1): Promise<JikanResponse<Anime[]>> {
  const url = `${JIKAN_API_BASE}/seasons/now?page=${page}`;
  return rateLimitedFetch(url);
}

// Search anime
export async function searchAnime(
  query: string,
  page: number = 1,
  filters?: {
    type?: string;
    score?: string;
    status?: string;
    rating?: string;
    genres?: string;
    order_by?: string;
    sort?: string;
  }
): Promise<JikanResponse<Anime[]>> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: '25',
  });
  
  // Add filters if they exist
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
  }
  
  const url = `${JIKAN_API_BASE}/anime?${params.toString()}`;
  return rateLimitedFetch(url);
}

// Get anime by ID
export async function getAnimeById(id: number): Promise<JikanResponse<Anime>> {
  const url = `${JIKAN_API_BASE}/anime/${id}/full`;
  return rateLimitedFetch(url);
}

// Get anime characters
export async function getAnimeCharacters(id: number): Promise<JikanResponse<Character[]>> {
  const url = `${JIKAN_API_BASE}/anime/${id}/characters`;
  return rateLimitedFetch(url);
}

// Get anime staff
export async function getAnimeStaff(id: number): Promise<JikanResponse<Staff[]>> {
  const url = `${JIKAN_API_BASE}/anime/${id}/staff`;
  return rateLimitedFetch(url);
}

// Get anime reviews
export async function getAnimeReviews(id: number, page: number = 1): Promise<JikanResponse<Review[]>> {
  const url = `${JIKAN_API_BASE}/anime/${id}/reviews?page=${page}`;
  return rateLimitedFetch(url);
}

// Get anime recommendations
export async function getAnimeRecommendations(id: number): Promise<JikanResponse<Recommendation[]>> {
  const url = `${JIKAN_API_BASE}/anime/${id}/recommendations`;
  return rateLimitedFetch(url);
}

// Get anime by genre
export async function getAnimeByGenre(genreId: number, page: number = 1): Promise<JikanResponse<Anime[]>> {
  const url = `${JIKAN_API_BASE}/anime?genres=${genreId}&page=${page}&order_by=score&sort=desc`;
  return rateLimitedFetch(url);
}

// Get random anime
export async function getRandomAnime(): Promise<JikanResponse<Anime>> {
  const url = `${JIKAN_API_BASE}/random/anime`;
  return rateLimitedFetch(url);
}

// Popular genres with their IDs
export const GENRES = {
  action: 1,
  adventure: 2,
  comedy: 4,
  drama: 8,
  fantasy: 10,
  horror: 14,
  mystery: 7,
  romance: 22,
  'sci-fi': 24,
  'slice-of-life': 36,
  sports: 30,
  supernatural: 37,
  thriller: 41,
};
