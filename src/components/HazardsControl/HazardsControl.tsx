import React from "react";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { StyledButton } from "../StyledButton/StyledButton";
import { ColourSquare } from "../ColourSquare/ColourSquare";
import { getHazardColor } from "../../shared/utils";

export const HazardsControl: React.FC<{ selectHazards: () => void, hazardsCount: number }> = ({selectHazards, hazardsCount }) => (

  <TitledContainer title="Hazards">
    <CenteredRow>
      <StyledButton onClick={selectHazards}>
        <ColourSquare colour={getHazardColor()} />
      </StyledButton>
      <span>Hazards Count: {hazardsCount}</span>
    </CenteredRow>
  </TitledContainer>
)