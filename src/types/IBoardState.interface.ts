import { ICoordinate } from "./ICoordinate.type";
import { ISnake } from "./ISnake.interface";

export interface IBoardState {
  board: {
    height: number;
    width: number;
    snakes: ISnake[];
    food: ICoordinate[];
    hazards: ICoordinate[];
  };
  game: {
    id: string;
  };
  turn: number;
  you: ISnake;
}