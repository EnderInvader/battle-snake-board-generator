import { TitledContainer } from './TitledContainer/TitledContainer';

export function getChangelog() {
	return  <TitledContainer title="Changelog">
						<p>v1.0 (lworkman)</p><p>Original</p>
						<hr></hr>
						<p>v2.0 (Nettogrof)</p><p>New update: "TestSnake" section is now working,<br></br>be sure to enter the full url with the /move at the end</p>
						<hr></hr>
						<p>v3.0</p><p>New update: Hazards!, along side an updated framework and<br></br>Battlesnake json format</p>
						<hr></hr>
						<p>v3.1</p><p>New update: Gamemodes!, hazard damager per turn is locked at 14</p>
						
						<br></br>
						<hr></hr>
						<p>Upcoming</p><p>Maps, More Ruleset settings</p>
					</TitledContainer>
}