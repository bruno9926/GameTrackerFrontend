import type { Game, GameToUpdate, GameToCreate } from "../model/Game";
import { apiClient } from "@shared/api/apiClient";
import type { GameTitle } from "../model/GameTitle";

const API_URL = import.meta.env.VITE_API_URL + "/games";

class GameService {
  private static instance: GameService;

  private constructor() {}

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
    return apiClient(API_URL);
  }

  /**
   * adds a game into the users games
   * @param game the game to add
   * @return all the games after the addition
   */
  async postGame(game: GameToCreate): Promise<Game[]> {
    return apiClient(API_URL, {
      method: "POST",
      body: game
    });
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
    return apiClient(`${API_URL}/${id}`, {
      method: "DELETE"
    });
  }

  /**
   * updates a game from the users games
   * @param game the game to update
   * @returns all the games after the update
   */
  async updateGame(game: GameToUpdate): Promise<Game[]> {
    if (!game.id) {
      throw new Error("The id provided is not valid");
    }
    return apiClient(API_URL, {
      method: "PUT",
      body: game,
    });
  }

  /**
   * search a game title by name
   * @param name the game title name to do the search
   * @returns all the games titles that contains the name
   */
  async searchGameTitle(name: string) : Promise<GameTitle[]> {
    if (!name) {
      throw new Error("A search query is required");
    }
    return apiClient(`${API_URL}/search?q=${name}`);
  }
}

export default GameService;
