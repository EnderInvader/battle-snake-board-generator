import React from "react";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { StyledButton } from "../StyledButton/StyledButton";
import { ColourSquare } from "../ColourSquare/ColourSquare";
import { getFoodColor } from "../../shared/utils";

export const FoodControl: React.FC<{ selectFood: () => void, foodCount: number }> = ({selectFood, foodCount }) => (

  <TitledContainer title="Food">
    <CenteredRow>
      <StyledButton onClick={selectFood}>
        <ColourSquare colour={getFoodColor()} />
      </StyledButton>
      <span>Food Count: {foodCount}</span>
    </CenteredRow>
  </TitledContainer>
)