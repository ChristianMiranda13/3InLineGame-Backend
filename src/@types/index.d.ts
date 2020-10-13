import { Document } from 'mongoose';

declare global {

  interface IGame {
    sanitize(): IGame;
    currentTurn: string;
    status: string;
    board: string[];
    winner?: string;
    updateAt?: string;
    createdAt?: string;
  }

  interface IGameModel extends IGame, Document {
    id?: string;
    sanitize(): IGame;
  }

  interface IObj {
    [key: string]: any;
  }

  interface IConstants {
    BACKEND_PORT: string;
    DB_URL: string;
    WINNING_COMBOS: number[][];
  }

}
