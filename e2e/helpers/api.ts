import { type APIRequestContext } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const API_URL = (process.env.VITE_API_URL ?? 'http://localhost:3003').replace(/\/$/, '');
const AUTH_FILE = resolve('playwright/.auth/user.json');

type StorageState = {
    origins: { origin: string; localStorage: { name: string; value: string }[] }[];
};

function getAuthHeaders() {
    const state: StorageState = JSON.parse(readFileSync(AUTH_FILE, 'utf-8'));
    const token = state.origins[0]?.localStorage.find(e => e.name === 'authToken')?.value;
    if (!token) throw new Error('No auth token found in storage state');
    return { Authorization: `Bearer ${token}` };
}

export async function createGame(request: APIRequestContext, searchQuery: string, status = 'playing') {
    const headers = getAuthHeaders();

    const searchRes = await request.get(`${API_URL}/games/search?q=${encodeURIComponent(searchQuery)}`, { headers });
    const titles = await searchRes.json();
    const { name, sourceId: gameTitleId, cover } = titles[0];

    const createRes = await request.post(`${API_URL}/games`, {
        headers,
        data: {
            name,
            gameTitleId,
            status,
            ...(cover ? { coverUrl: cover } : {})
        }
    });

    if (!createRes.ok()) throw new Error(`Failed to create game: ${await createRes.text()}`);
}

export async function deleteAllGames(request: APIRequestContext) {
    const headers = getAuthHeaders();

    const res = await request.get(`${API_URL}/games`, { headers });
    const games: { id: string }[] = await res.json();

    for (const game of games) {
        await request.delete(`${API_URL}/games/${game.id}`, { headers });
    }
}
