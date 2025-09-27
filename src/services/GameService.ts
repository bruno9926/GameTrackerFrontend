import type { Game } from "../types/Game";

const API_URL = import.meta.env.VITE_API_URL;

class GameService {
    private static instance: GameService;

    private static defaultHeaders = {
        'Content-Type': 'application/json'
    }

    static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService()
        }
        return GameService.instance;
    }

    /**
     * returns a list with all the games
     * @returns all the games
     */
    async fetchGames(): Promise<Game[]> {
        const res = await fetch(API_URL);
        return this.handleResponse<Game[]>(res);
    }

    /**
     * adds a game into the users games
     * @return all the games after the addition
     */
    async postGame(game: Omit<Game, 'id'>): Promise<Game[]> {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: GameService.defaultHeaders,
            body: JSON.stringify(game)
        });
        return this.handleResponse<Game[]>(res);
    }

    private async handleResponse<T>(res: Response): Promise<T> {
        if (!res.ok) throw new Error("Error: " + res.statusText);
        return res.json();
    }
}

export default GameService;