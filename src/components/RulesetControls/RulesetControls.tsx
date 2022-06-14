import React from "react";
import { StyledInput } from "../StyledInput/StyledInput";
import { onChangeNumberLimitFactory, onBlurSetMinimumFactory } from "../../shared/utils";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { StyledDropdown } from "../StyledDropdown/StyledDropdown";
import { getRulesetsList } from "../../shared/rulesets";

export interface IRulesetControls {
	rulesetName: string;
	foodSpawnChance: string;
	minimumFood: string;
	hazardDamagePerTurn: string;
	changeName: (value: string) => void;
	changeFoodSpawn: (value: string) => void;
	changeMinFood: (value: string) => void;
	changeHazardDamage: (value: string) => void;
}

export class RulesetControls extends React.Component<IRulesetControls> {
	render() {
		const { rulesetName, foodSpawnChance, minimumFood, hazardDamagePerTurn, changeName, changeFoodSpawn, changeMinFood, changeHazardDamage } = this.props;
		return (
			<TitledContainer title="Ruleset">
				<CenteredRow>
					<StyledDropdown title="Gamemode" value={rulesetName} values={getRulesetsList()} onChange={(event: any) => changeName(event.target.value)} />
				</CenteredRow>
				<CenteredRow>
					<StyledInput title="Food Spawn Chance" value={foodSpawnChance} onBlur={onBlurSetMinimumFactory(changeFoodSpawn, 100, 0)} onChange={onChangeNumberLimitFactory(changeFoodSpawn, 100, 0)} />
					<StyledInput title="Minimum Food" value={minimumFood} onBlur={onBlurSetMinimumFactory(changeMinFood, 50, 0)} onChange={onChangeNumberLimitFactory(changeMinFood, 100, 0)} />
					<StyledInput title="Hazard Damage Per Turn" value={hazardDamagePerTurn} onBlur={onBlurSetMinimumFactory(changeHazardDamage, 100, 0)} onChange={onChangeNumberLimitFactory(changeHazardDamage, 100, 0)} />
				</CenteredRow>
			</TitledContainer>
		)

	}
}
