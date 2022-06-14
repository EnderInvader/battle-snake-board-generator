import React from "react";
import "./SnakeControl.css";
import { StyledInput } from "../StyledInput/StyledInput";
import { StyledButton } from "../StyledButton/StyledButton";
import { onChangeNumberLimitFactory, onBlurSetMinimumFactory } from "../../shared/utils";
import { ColourSquare } from "../ColourSquare/ColourSquare";

export interface ISnakeControl {
  colour: string;
  health: string;
  selectSnake: () => void;
  changeHealth: (value: string) => void;
  title?: string;
}

export class SnakeControl extends React.Component<ISnakeControl, {}> {

  render() {

    const { colour, health, selectSnake, changeHealth } = this.props;

    return (
      <div className="snake-control-container">
        <StyledButton onClick={selectSnake}>
          <ColourSquare colour={colour} />
        </StyledButton>
        <div className="vertical-flex-container">
          <span>{colour}</span>
          <div>
            <StyledInput title="Health" value={health} onBlur={onBlurSetMinimumFactory(changeHealth, 100, 1)} onChange={onChangeNumberLimitFactory(changeHealth, 100, 0)} />
          </div>
        </div>
      </div>
    )
  }
}
