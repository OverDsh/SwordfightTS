import { createCollection } from "@rbxts/lapis";
import { DataStoreService } from "@rbxts/services";
import { serverStore } from "server/store";
import { selectPlayerData, selectPlayerEntry } from "shared/store/data/data-selectors";
import { defaultPlayerData, PlayerDataType, validatePlayerData } from "shared/store/data/data-types";
import { onPlayerAdded, playerDisconnectedPromise } from "shared/utils/player-utils";

function v1(old: unknown) {
	return old;
}

function updateTimeLeaderboard(player: Player) {
	if (player.UserId <= 0) {
		return;
	}
	DataStoreService.GetOrderedDataStore("TimeLeaderboard").SetAsync(
		tostring(player.UserId),
		serverStore.getState(selectPlayerEntry(player, "highestTime")),
	);
}

const dataCollection = createCollection("Players", {
	defaultData: defaultPlayerData,
	validate: validatePlayerData,
});

async function loadPlayerData(player: Player) {
	try {
		const document = await dataCollection.load(`${player.UserId}`);

		const disconnect = serverStore.subscribe(selectPlayerData(player), (newData) => {
			if (newData) {
				document.write(newData);
			}
		});

		playerDisconnectedPromise(player).then(() => {
			disconnect();
			updateTimeLeaderboard(player);
			serverStore.deletePlayerData(player);
			document.close();
		});

		serverStore.setPlayerData(player, document.read());
	} catch (e) {
		warn(`Error while loading player data: ${e}`);
		player.Kick(`There was an error while loading your data: ${e}`);
	}
}

export async function initDataService() {
	onPlayerAdded((player) => {
		loadPlayerData(player);
	});
}
