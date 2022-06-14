import { TitledContainer } from '../components/TitledContainer/TitledContainer';

export function getChangelog() {
	return  <TitledContainer title="Changelog">
						<p>v1.0 (lworkman)</p><p>Original</p>
						<hr></hr>
						<p>v2.0 (Nettogrof)</p><p>New update: "TestSnake" section is now working,<br></br>be sure to enter the full url with the /move at the end</p>
						<hr></hr>
						<p>v3.0 (EnderInvader)</p><p>New update: Hazards! Rulesets! Maps!, along side<br></br>an updated framework and Battlesnake json format</p>
						
						<br></br>
						<hr></hr>
						<p>Upcoming</p><p>Customizations, Better Snake Control, Fix Test Snake</p>
					</TitledContainer>
}