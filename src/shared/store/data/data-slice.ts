import { createProducer } from "@rbxts/reflex";
import { PlayerDataType } from "./data-types";
import { number } from "@rbxts/react/src/prop-types";
import { updateTable } from "shared/utils/table-utils";
import { Players } from "@rbxts/services";

interface DataStateType {
	readonly [id: string]: PlayerDataType | undefined;
}
const initialState: DataStateType = {};

export const dataSlice = createProducer(initialState, {
	setPlayerData: (state, player: Player, data: PlayerDataType) => ({
		...state,
		[player.Name]: data,
	}),
	deletePlayerData: (state, player: Player) => ({
		...state,
		[player.Name]: undefined,
	}),
	setPlayerDataEntry: (state, player: Player, entry: keyof PlayerDataType, newVal: number) => {
		return updateTable(state, player.Name, (t) => {
			const newTable = table.clone(t);
			newTable[entry] = newVal;
			return newTable;
		});
	},
	addPlayerDataEntry: (state, player: Player, entry: keyof PlayerDataType, amount: number) => {
		return updateTable(state, player.Name, (t) => {
			const newTable = table.clone(t);
			newTable[entry] += amount;
			return newTable;
		});
	},
});
