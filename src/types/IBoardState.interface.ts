import { ICoordinate } from "./ICoordinate.type";
import { IRuleset } from "./IRuleset.interface";
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
		ruleset: IRuleset;
		map: string;
  };
  turn: number;
  you: ISnake;
}