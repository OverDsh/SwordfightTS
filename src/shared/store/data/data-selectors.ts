import { SharedRootState } from "..";
import { createSelector } from "@rbxts/reflex";
import { PlayerDataType } from "./data-types";

export const selectDataSlice = (state: SharedRootState) => {
	return state.data;
};

export const selectPlayerData = (player: Player) => {
	return createSelector(selectDataSlice, (dataTable) => {
		return dataTable?.[player.Name];
	});
};

export const selectPlayerEntry = (player: Player, entry: keyof PlayerDataType) => {
	return createSelector(selectDataSlice, (dataTable) => {
		return dataTable?.[player.Name]?.[entry];
	});
};
