import React from "react";
import { IBoardState } from "../types/IBoardState.interface";
import { ISnake } from "../types/ISnake.interface";
import { CellComponent } from "./CellComponent/CellComponent";

export interface IBoard {
  boardState: IBoardState,
  onChange: (x: number, y: number, id: string) => void;
}

export const Board = ({ boardState, onChange }: IBoard) => (
  <div style={{marginTop: 10}}>
    {generateBoard(boardState, onChange).map((column, index) => <div key={index} style={{display: "flex"}}>{column.map(element => element)}</div>)}
  </div>
)

const generateBoard = (boardState: IBoardState, onChange: (x: number, y: number, id: string) => void) => {
  const output: JSX.Element[][] = [];
  const boardWithSnakes: {
    colour: string;
    isHead: boolean;
    id: string;
  }[][] = [];
  boardState.board.snakes.concat(boardState.you).forEach(snake => {
    snake.body.forEach((segment, index) => {
      if (!boardWithSnakes[segment.x]) {
        boardWithSnakes[segment.x] = [];
      }
      boardWithSnakes[segment.x][segment.y] = {
        colour: snake.name,
        id: snake.id,
        isHead: index === 0
      };
    })
  })

  for (let y = boardState.board.height -1 ; y >= 0 ; y--) {
    output.push([]);
  }

  for (let y = boardState.board.height -1 ; y >= 0 ; y--) {
    
    for (let x = 0; x < boardState.board.width; x++) {
      let snakePiece: {
        colour: string;
        isHead: boolean;
        id: string;
      } | undefined = boardWithSnakes[x] && boardWithSnakes[x][y] ? boardWithSnakes[x][y] : undefined;

      if (boardState.board.food.some(food => food.x === x && food.y === y)) {
        output[boardState.board.height -1 - y].push(<CellComponent key={`${x},${boardState.board.height -1 - y}`} colour="orange" onChange={() => onChange(x, y, "food")} />)
			} else if (boardState.board.hazard.some(hazard => hazard.x === x && hazard.y === y)) {
        output[boardState.board.height -1 - y].push(<CellComponent key={`${x},${boardState.board.height -1 - y}`} colour="red" onChange={() => onChange(x, y, "hazard")} />)
			} else if (snakePiece !== undefined) {
        let id: string = snakePiece.id;
        output[boardState.board.height -1 - y].push(<CellComponent key={`${x},${boardState.board.height -1 - y}`} colour={snakePiece.colour} isHead={snakePiece.isHead} onChange={() => onChange(x,  y, id)} />)
      } else {
        output[boardState.board.height -1 -y].push(<CellComponent key={`${x},${boardState.board.height -1 - y}`} onChange={() => onChange(x,  y, "")} />)
      }
    }
  }
  return output;
}