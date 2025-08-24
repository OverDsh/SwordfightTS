import { serverStore } from "server/store";
import { bindPassToCallback } from "./gamepass-process";
import { selectPlayerEntry } from "shared/store/data/data-selectors";
import { MessageClient, resolveCharacter } from "shared/utils/player-utils";

function giveDailyReward(player: Player, lastClaim: number) {
	if (lastClaim + 24 * 60 * 60 <= os.time()) {
		serverStore.addPlayerDataEntry(player, "tokens", 100);
		serverStore.setPlayerDataEntry(player, "lastVIPClaim", os.time());
		MessageClient(player, "You have claimed your daily reward of 100 tokens!");
	}
}

export async function initGamePassService() {
	bindPassToCallback(1009973883, (player) => {
		player.AddTag("VIP");
		const lastClaim = serverStore.getState(selectPlayerEntry(player, "lastVIPClaim"));
		if (lastClaim !== undefined) {
			giveDailyReward(player, lastClaim);
		} else {
			serverStore.once(selectPlayerEntry(player, "lastVIPClaim"), (lastVIPClaim) => {
				if (lastVIPClaim !== undefined) {
					giveDailyReward(player, lastVIPClaim);
				}
			});
		}
	});
	bindPassToCallback(1009536103, (player) => {
		const Character = player.Character;
		if (Character !== undefined) {
			resolveCharacter(Character).andThen((char) => {
				char.Humanoid.MaxHealth = 200;
				char.Humanoid.Health = 200;
			});
		}
		player.CharacterAdded.Connect((Character) => {
			resolveCharacter(Character).andThen((char) => {
				char.Humanoid.MaxHealth = 200;
				char.Humanoid.Health = 200;
			});
		});
	});
	bindPassToCallback(1009790082, (player) => {
		const Character = player.Character;
		if (Character !== undefined) {
			resolveCharacter(Character).andThen((char) => {
				char.Humanoid.WalkSpeed = 30;
			});
		}
		player.CharacterAdded.Connect((Character) => {
			resolveCharacter(Character).andThen((char) => {
				char.Humanoid.WalkSpeed = 30;
			});
		});
	});
}
