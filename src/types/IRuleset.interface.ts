export interface IRuleset {
  name: string;
	settings: {
		foodSpawnChance: number,
		minimumFood: number,
		hazardDamagePerTurn: number,
		hazardMap: string,
		hazardMapAuthor: string,
	}
};