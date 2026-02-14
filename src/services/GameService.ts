import type { Game, GameToUpdate, GameToCreate } from "../types/Game";

const API_URL = import.meta.env.VITE_API_URL;

class GameService {
  private static instance: GameService;

  private static defaultHeaders = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  };

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  /**
   * returns a list with all the games
   * @returns all the games
   */
  async fetchGames(): Promise<Game[]> {
    console.log("Fetching games from API at:", API_URL);
    const res = await fetch(API_URL, {
      method: "GET",
      headers: GameService.defaultHeaders,
    });
    return this.handleResponse<Game[]>(res);
  }

  /**
   * adds a game into the users games
   * @param game the game to add
   * @return all the games after the addition
   */
  async postGame(game: GameToCreate): Promise<Game[]> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: GameService.defaultHeaders,
      body: JSON.stringify(game),
    });
    return this.handleResponse<Game[]>(res);
  }

  /**
   * deletes a game from the users games
   * @param id the id of the game to delete
   * @returns all the games after the deletion
   */
  async deleteGame(id: string): Promise<Game[]> {
    if (!id) {
      throw new Error("The id provided is not valid");
    }
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: GameService.defaultHeaders,
    });
    return this.handleResponse<Game[]>(res);
  }

  async updateGame(game: GameToUpdate): Promise<Game[]> {
    if (!game.id) {
      throw new Error("The id provided is not valid");
    }
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: GameService.defaultHeaders,
      body: JSON.stringify(game),
    });
    return this.handleResponse<Game[]>(res);
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      let message = res.statusText;
      const data = await res.json();
      if (data?.message) {
        message = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
      }
      throw new Error("Error: " + message);
    }
    return res.json();
  }
}

export default GameService;
