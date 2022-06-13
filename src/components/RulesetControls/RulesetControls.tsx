import React from "react";
import { StyledInput } from "../StyledInput/StyledInput";
import { onChangeNumberLimitFactory, onBlurSetMinimumFactory } from "../../shared/utils";
import { StyledButton } from "../StyledButton/StyledButton";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { IRuleset } from "../../types/IRuleset.interface";
import { StyledDropdown } from "../StyledDropdown/StyledDropdown";

export interface IRulesetControls {
	ruleset: IRuleset;
	changeName: (value: string) => void;
	changeFoodSpawn: (value: string) => void;
	changeMinFood: (value: string) => void;
	changeHazardDamage: (value: string) => void;
}

export class RulesetControls extends React.Component<IRulesetControls> {
	render() {
		const { ruleset, changeName, changeFoodSpawn, changeMinFood, changeHazardDamage } = this.props;
		return (
			<TitledContainer title="Ruleset">
				<CenteredRow>
					<StyledDropdown title="Gamemode" value={ruleset.name} values={["standard","wrapped"]} onChange={(event: any) => changeName(event.target.value)} />
				</CenteredRow>
				<CenteredRow>
					<StyledInput title="Food Spawn Chance" value={ruleset.settings.foodSpawnChance} onBlur={onBlurSetMinimumFactory(changeFoodSpawn, 1)} onChange={onChangeNumberLimitFactory(changeFoodSpawn, 100, 0)} />
					<StyledInput title="Minimum Food" value={ruleset.settings.minimumFood} onBlur={onBlurSetMinimumFactory(changeMinFood, 1)} onChange={onChangeNumberLimitFactory(changeMinFood, 100, 0)} />
					<StyledInput title="Hazard Damage Per Turn" value={ruleset.settings.hazardDamagePerTurn} onBlur={onBlurSetMinimumFactory(changeHazardDamage, 1)} onChange={onChangeNumberLimitFactory(changeHazardDamage, 100, 0)} />
				</CenteredRow>
			</TitledContainer>
		)

	}
}
