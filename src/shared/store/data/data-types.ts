import { t } from "@rbxts/t";

export interface PlayerDataType {
	tokens: number;
	maxTimeInGame: number;
	currentTimer: number;
	highestTime: number;
	oldTimer: number;
	lastVIPClaim: number;
}

export const defaultPlayerData: PlayerDataType = {
	tokens: 0,
	maxTimeInGame: 0,
	currentTimer: 0,
	highestTime: 0,
	oldTimer: 0,
	lastVIPClaim: 0,
};

export const validatePlayerData: t.check<PlayerDataType> = t.interface({
	tokens: t.number,
	maxTimeInGame: t.number,
	currentTimer: t.number,
	oldTimer: t.number,
	highestTime: t.number,
	lastVIPClaim: t.number,
});
