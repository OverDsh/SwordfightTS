/* eslint-disable no-constant-condition */
import { serverStore } from "server/store";
import { onPlayerAdded, playerDisconnectedPromise } from "shared/utils/player-utils";

export async function initTimerService() {
	onPlayerAdded((player) => {
		const timerThread = task.spawn(() => {
			let inSafezone = true;
			player.GetAttributeChangedSignal("inSafezone").Connect(() => {
				inSafezone = player.GetAttribute("inSafezone") as boolean;
			});
			while (true) {
				task.wait(1);
				if (!inSafezone) {
					serverStore.addPlayerDataEntry(player, "currentTimer", 1);
				}
			}
		});
		playerDisconnectedPromise(player).then(() => {
			task.cancel(timerThread);
		});
	});
}
