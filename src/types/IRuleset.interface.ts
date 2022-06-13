export interface IRuleset {
  name: string /*"standard" | "wrapped";*/
	settings: {
		foodSpawnChance: number,
		minimumFood: number,
		hazardDamagePerTurn: number,
		hazardMap: string,
		hazardMapAuthor: string,
	}
};