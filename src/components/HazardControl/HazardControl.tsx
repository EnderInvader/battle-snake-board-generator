import React from "react";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { StyledButton } from "../StyledButton/StyledButton";
import { ColourSquare } from "../ColourSquare/ColourSquare";

export const HazardControl: React.FC<{ selectHazard: () => void, hazardCount: number }> = ({selectHazard, hazardCount }) => (

  <TitledContainer title="Hazard">
    <CenteredRow>
      <StyledButton onClick={selectHazard}>
        <ColourSquare colour="orange" />
      </StyledButton>
      <span>Hazard Count: {hazardCount}</span>
    </CenteredRow>
  </TitledContainer>
)