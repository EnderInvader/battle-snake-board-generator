import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import { IBoardState } from './types/IBoardState.interface';
import { Board } from './components/board';
import { ICoordinate } from './types/ICoordinate.type';
import { TitledContainer } from './components/TitledContainer/TitledContainer';
import { BoardControls } from './components/BoardControls/BoardControls';
import { generateColour, generateId, getColorArray, getFoodColor, getHazardColor, getYouColor } from './shared/utils';
import { TestSnake } from './components/TestSnake/TestSnake';
import { ColourSquare } from './components/ColourSquare/ColourSquare';
import { FoodControl } from './components/FoodControl/FoodControl';
import { HazardsControl } from './components/HazardsControl/HazardsControl';
import { YouControl } from './components/YouControl/YouControl';
import { OtherSnakesControl } from './components/OtherSnakesControl/OtherSnakesControl';
import { getChangelog } from './shared/changelog';
import { RulesetControls } from './components/RulesetControls/RulesetControls';
import { getMapsList } from './shared/maps';

interface IAppState {
	id: string;
	height: string;
	width: string;
	food: ICoordinate[];
	hazards: ICoordinate[];
	snakes: {
		id: string;
		colour: string;
		body: ICoordinate[];
		health: string;
	}[];
	you: {
		colour: string;
		body: ICoordinate[];
		health: string;
		id: "you";
	};
	mode: "food" | "hazards" | "you" | "snake";
	chosenId: string;
	ruleset: {
		name: string
		settings: {
			foodSpawnChance: string,
			minimumFood: string,
			hazardDamagePerTurn: string,
			hazardMap: string,
			hazardMapAuthor: string,
		}
	};
	map: string;
}

class App extends Component<{}, IAppState> {

	constructor(props: {}) {
		super(props);

		this.state = {
			id: generateId(),
			height: "11",
			width: "11",
			food: [],
			hazards: [],
			snakes: [],
			you: {
				colour: getYouColor(),
				body: [],
				health: "100",
				id: "you"
			},
			mode: "food",
			chosenId: "",
			ruleset: {
				name: "standard",
				settings: {
					foodSpawnChance: "20",
					minimumFood: "1",
					hazardDamagePerTurn: "14",
					hazardMap: "",
					hazardMapAuthor: "",
				}
			},
			map: ""
		}
	}

	private findExistingCell = (id: string, x: number, y: number) => {
		const { food, hazards, you, snakes } = this.state;

		switch (id) {
			case "food":
				return {
					id: "food",
					index: food.findIndex(item => item.x === x && item.y === y)
				};
			case "hazards":
				return {
					id: "hazards",
					index: hazards.findIndex(item => item.x === x && item.y === y)
				};
			case "you":
				return {
					id: "you",
					index: you.body.findIndex(item => item.x === x && item.y === y)
				};
			case undefined:
				return undefined;
			default:
				const snake = snakes.find(snake => snake.id === id);
				if (snake) {
					return {
						id: id,
						index: snake.body.findIndex(item => item.x === x && item.y === y)
					};
				}
		}
	}

	private checkIfCellConnected: (x: number, y: number, body: ICoordinate[]) => boolean = (x, y, body) => {
		return body.some(segment => (Math.abs(segment.x - x) === 1 && segment.y === y) || (Math.abs(segment.y - y) === 1 && segment.x === x));
	}

	public selectCell = (x: number, y: number, id: string) => {

		const { mode, food, hazards, you, snakes, chosenId } = this.state;
		let existingIndex: {
			id: string;
			index: number;
		} | undefined = this.findExistingCell(id, x, y);

		if (existingIndex) {

			const foundId: string = existingIndex.id;

			switch (foundId) {
				case "food":
					food.splice(existingIndex.index, 1);
					break;
				case "hazards":
					hazards.splice(existingIndex.index, 1);
					break;
				case "you":
					you.body.splice(existingIndex.index);
					break;
				default:
					const matchingSnake = snakes.find(snake => snake.id === foundId);
					if (matchingSnake) {
						matchingSnake.body.splice(existingIndex.index)
					}
					break;
			}
		}

		if (!existingIndex || (existingIndex.id !== mode && existingIndex.id !== chosenId)) {
			switch (mode) {
				case "food":
					food.push({ x, y });
					break;
				case "hazards":
					hazards.push({ x, y });
					break;
				case "you":
					if (you.body.length === 0 || this.checkIfCellConnected(x, y, you.body)) {
						you.body.unshift({ x, y });
					}
					break;
				case "snake":
					const matchingSnake = snakes.find(snake => snake.id === chosenId);
					if (!matchingSnake) {
						return;
					}
					if (matchingSnake.body.length === 0 || this.checkIfCellConnected(x, y, matchingSnake.body)) {
						matchingSnake.body.unshift({ x, y });
					}
					break;
			}
		}

		this.setState({ mode, food, hazards, you, snakes, chosenId });
	}

	private buildBoardState: () => IBoardState = () => {
		return {
			game: {
				id: this.state.id,
				ruleset: {
					name: this.state.ruleset.name,
					version: "board-generator",
					settings: {
						foodSpawnChance: parseInt(this.state.ruleset.settings.foodSpawnChance, 10),
						minimumFood: parseInt(this.state.ruleset.settings.minimumFood, 10),
						hazardDamagePerTurn: parseInt(this.state.ruleset.settings.hazardDamagePerTurn, 10),
						/*hazardMap: this.state.ruleset.settings.hazardMap,
						hazardMapAuthor: this.state.ruleset.settings.hazardMapAuthor,*/
						hazardMap: "",
						hazardMapAuthor: "",
						royale: {
							shrinkEveryNTurns: 25
						},
						squad: {
							allowBodyCollisions: false,
							sharedElimination: false,
							sharedHealth: false,
							sharedLength: false
						}
					}
				},
				map: this.state.map,
				timeout: 500,
				source: "",
			},
			turn: 123,
			board: {
				height: parseInt(this.state.height, 10),
				width: parseInt(this.state.width, 10),
				snakes: [{
					id: "you",
					name: this.state.you.colour,
					latency: "0",
					health: parseInt(this.state.you.health, 10),
					body: this.state.you.body,
					head: this.state.you.body[0],
					length: this.state.you.body.length,
					shout: "",
					squad: "",
					customizations: {	
						color: this.state.you.colour,	
						head: "default",	
						tail: "default",
					}
				}].concat(this.state.snakes.map(snake => ({
					id: snake.id,
					name: snake.colour,
					latency: "0",
					health: parseInt(snake.health, 10),
					body: snake.body,
					head: snake.body[0],
					length: snake.body.length,
					shout: "",
					squad: "",	
					customizations: {	
						color: snake.colour,	
						head: "default",	
						tail: "default",
					}
				}))),
				food: this.state.food,
				hazards: this.state.hazards,
			},
			you: {
				id: "you",
				name: this.state.you.colour,
				latency: "0",
				health: parseInt(this.state.you.health, 10),
				body: this.state.you.body,
				head: this.state.you.body[0],
				length: this.state.you.body.length,
				shout: "",
				squad: "",
				customizations: {	
					color: this.state.you.colour,	
					head: "default",	
					tail: "default",
				}
			},
		}
	}

	public addSnake = () => {
		const { snakes } = this.state;
		const colorArray = getColorArray()
		let colour = ""

		if(snakes.length <= colorArray.length) {
			colour = colorArray[snakes.length]
		} else {
			colour = generateColour()
		}

		snakes.push({
			body: [],
			colour: colour,
			health: "100",
			id: "Snake".concat((snakes.length+1).toString())
		});

		this.setState({ snakes })
	}

	public removeSnake = () => {
		const { snakes } = this.state;
		snakes.pop()

		this.setState({ snakes })
	}

	public selectSnake = (id: string) => {
		this.setState({
			mode: "snake",
			chosenId: id
		});
	}

	public selectFood = () => {
		this.setState({
			mode: "food",
			chosenId: ""
		});
	}

	public selectHazards = () => {
		this.setState({
			mode: "hazards",
			chosenId: ""
		});
	}

	public selectYou = () => {
		this.setState({
			mode: "you",
			chosenId: ""
		});
	}

	public changeSnakeHealth = (health: string, targetSnakeId: "you" | string) => {
		const { you, snakes } = this.state;

		if (targetSnakeId === "you") {
			you.health = health;
			this.setState({ you });
			return;
		} else {
			const targetSnake = snakes.find(snake => snake.id === targetSnakeId);
			if (targetSnake) {
				targetSnake.health = health;
				this.setState({ snakes });
			}
		}
	}

	public changeBoardHeight = (height: string) => {
		if (this.state.map === "arcade_maze") {
			this.setState({ height: "21" })
		} else {
			this.setState({ height })
		}
	}
	public changeBoardWidth = (width: string) => {
		if (this.state.map === "arcade_maze") {
			this.setState({ width: "19" })
		} else {
			this.setState({ width })
		}
	}
	public changeBoardMap = (map: string) => {
		this.setState({ map })
		for (let _map of getMapsList()) {
			if (_map.value === map) {
				if (_map.height) {
					this.setState({
						height: _map.height.toString()
					})
				} else {
					this.setState({
						height: "11"
					})
				}

				if (_map.width) {
					this.setState({
						width: _map.width.toString()
					})
				} else {
					this.setState({
						width: "11"
					})
				}

				if (_map.gamemode) {
					const { ruleset } = this.state;
					ruleset.name = _map.gamemode
					this.setState({ ruleset })
				} else {
					const { ruleset } = this.state;
					ruleset.name = "standard"
					this.setState({ ruleset })
				}

				if (_map.hazardDamagePerTurn) {
					const { ruleset } = this.state;
					ruleset.settings.hazardDamagePerTurn = _map.hazardDamagePerTurn.toString()
					this.setState({ ruleset })
				} else {
					const { ruleset } = this.state;
					ruleset.settings.hazardDamagePerTurn = "14"
					this.setState({ ruleset })
				}

				if (_map.hazards) {
					this.setState({
						hazards: _map.hazards
					})
				} else {
					this.setState({
						hazards: []
					})
				}
				break
			}
		}
	}

	public changeRulesetName = (rulesetName: string) => {
		const { ruleset } = this.state;
		ruleset.name = rulesetName
		this.setState({ ruleset })
	}
	public changeFoodSpawn = (foodSpawnChance: string) => {
		const { ruleset } = this.state;
		ruleset.settings.foodSpawnChance = foodSpawnChance
		this.setState({ ruleset })
	}
	public changeMinFood = (minimumFood: string) => {
		const { ruleset } = this.state;
		ruleset.settings.minimumFood = minimumFood
		this.setState({ ruleset })
	}
	public changeHazardDamage = (hazardDamagePerTurn: string) => {
		const { ruleset } = this.state;
		ruleset.settings.hazardDamagePerTurn = hazardDamagePerTurn
		this.setState({ ruleset })
	}

	public uploadBoard = (board: string) => {
		try {
			const uploadedState: IBoardState = JSON.parse(board);
			this.setState({
				id: generateId(),
				height: uploadedState.board.height.toString(),
				width: uploadedState.board.width.toString(),
				food: uploadedState.board.food,
				hazards: uploadedState.board.hazards,
				ruleset: {
					name: uploadedState.game.ruleset.name,
					settings: {
						foodSpawnChance: uploadedState.game.ruleset.settings.foodSpawnChance.toString(),
						minimumFood: uploadedState.game.ruleset.settings.minimumFood.toString(),
						hazardDamagePerTurn: uploadedState.game.ruleset.settings.hazardDamagePerTurn.toString(),
						/*hazardMap: uploadedState.game.ruleset.settings.hazardMap,
						hazardMapAuthor: uploadedState.game.ruleset.settings.hazardMapAuthor,*/
						hazardMap: "",
						hazardMapAuthor: ""
					}
				},
				map: uploadedState.game.map,
				snakes: uploadedState.board.snakes.filter(snake => snake.id !== uploadedState.you.id).map((snake, i) => {
					const colour: string = getColorArray()[i]
					return {
						id: "Snake".concat((i+1).toString()),
						colour: colour,
						body: snake.body,
						health: snake.health.toString(),
					}
				}),
				you: {
					colour: getYouColor(),
					body: uploadedState.you.body,
					health: uploadedState.you.health.toString(),
					id: "you"
				},
				mode: "food",
				chosenId: "",
			});
		} catch (e) {
			alert("That didn't work");
		}
	}

	render() {

		const { height, width, map, snakes, you, food, hazards, mode, chosenId, ruleset } = this.state;

		return (
			<div className="App">
				<div className="control-container">
					<YouControl selectYou={this.selectYou} colour={you.colour} health={you.health} changeHealth={(value) => this.changeSnakeHealth(value, "you")} />
					<OtherSnakesControl addSnake={this.addSnake} removeSnake={this.removeSnake} changeSnakeHealth={this.changeSnakeHealth} selectSnake={this.selectSnake} snakes={snakes} />
					<FoodControl foodCount={food.length} selectFood={this.selectFood} />
					<HazardsControl hazardsCount={hazards.length} selectHazards={this.selectHazards} />
					<BoardControls
						height={height}
						width={width}
						map={map}
						changeHeight={this.changeBoardHeight}
						changeWidth={this.changeBoardWidth}
						changeMap={this.changeBoardMap}
						uploadBoard={this.uploadBoard}
						boardState={this.buildBoardState()}
					/>
					<RulesetControls
						rulesetName={ruleset.name}
						foodSpawnChance={ruleset.settings.foodSpawnChance}
						minimumFood={ruleset.settings.minimumFood}
						hazardDamagePerTurn={ruleset.settings.hazardDamagePerTurn}
						changeName={this.changeRulesetName}
						changeFoodSpawn={this.changeFoodSpawn}
						changeMinFood={this.changeMinFood}
						changeHazardDamage={this.changeHazardDamage}
					/>
					<TestSnake boardState={this.buildBoardState()} />
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					<br></br>
					{getChangelog()}
				</div>
				<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
					<TitledContainer title="Current Mode">
						<div className="current-mode">
							<ColourSquare colour={mode === "food" ? getFoodColor() : mode === "hazards" ? getHazardColor() : mode === "you" ? getYouColor() : snakes.find(snake => snake.id === chosenId)?.colour ?? "" } />
							<span style={{ marginLeft: 10 }}>{mode !== "snake" ? mode : chosenId}</span>
						</div>
					</TitledContainer>
					<Board boardState={this.buildBoardState()} onChange={this.selectCell} />
				</div>
			</div>
		);
	}
}

export default App;
