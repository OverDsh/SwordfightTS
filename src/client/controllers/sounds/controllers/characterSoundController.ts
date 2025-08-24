import { Players } from "@rbxts/services";
import { onPlayerAdded, resolveCharacter } from "shared/utils/player-utils";

function deleteSoundsFromPart(part: Instance) {
	part.GetChildren().forEach((sound) => {
		if (sound.IsA("Sound") && sound.Name !== "Died") {
			sound.Stop();
			sound.Destroy();
		}
	});
}

function deleteSoundFromPlayer(player: Player) {
	const Character = player.Character ?? player.CharacterAdded.Wait()[0];
	if (Character !== undefined) {
		resolveCharacter(Character).andThen((Char) => {
			deleteSoundsFromPart(Char.HumanoidRootPart);
			Char.HumanoidRootPart.ChildAdded.Connect((child) => {
				deleteSoundsFromPart(Char.HumanoidRootPart);
			});
		});
	}
}

export function initCharacterSoundController() {
	onPlayerAdded((player) => {
		deleteSoundFromPlayer(player);
		player.CharacterAdded.Connect(() => {
			deleteSoundFromPlayer(player);
		});
	});
}
