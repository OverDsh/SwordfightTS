import { Players } from "@rbxts/services";
import { Icon } from "@rbxts/topbar-plus";
import { PromptTokenPurchase } from "client/components/Pages/PurchaseConfirmation";
import { Character, onPlayerAdded, resolveCharacter } from "shared/utils/player-utils";

function setupKillPlayerPrompt(player: Player, Character: Character) {
	const Prompt = new Instance("ProximityPrompt");

	Prompt.ActionText = "Reset Player's Timer";
	Prompt.HoldDuration = 0;
	Prompt.KeyboardKeyCode = Enum.KeyCode.E;

	Prompt.Parent = Character.WaitForChild("Torso");

	Prompt.RequiresLineOfSight = false;
	Prompt.MaxActivationDistance = 5;
	Prompt.ClickablePrompt = false;

	Prompt.Triggered.Connect(() => PromptTokenPurchase(1, [player.UserId]));
}

function setupStealPlayerTimerPrompt(player: Player, Character: Character) {
	const Prompt = new Instance("ProximityPrompt");

	Prompt.ActionText = "Steal Timer";
	Prompt.HoldDuration = 0;
	Prompt.KeyboardKeyCode = Enum.KeyCode.R;

	Prompt.Parent = Character.WaitForChild("Head");

	Prompt.RequiresLineOfSight = false;
	Prompt.MaxActivationDistance = 5;
	Prompt.ClickablePrompt = false;

	Prompt.Triggered.Connect(() => PromptTokenPurchase(2, [player.UserId]));
}

export function initPlayersPrompts() {
	onPlayerAdded((player) => {
		if (player === Players.LocalPlayer) {
			return;
		}

		const Character = player.Character ?? player.CharacterAdded.Wait()[0];
		if (!Character) {
			warn(`Couldn't find the character of ${player.Name}`);
			return;
		}
		resolveCharacter(Character).then((char) => {
			setupStealPlayerTimerPrompt(player, char);
			setupKillPlayerPrompt(player, char);
		});

		player.CharacterAdded.Connect((Char) => {
			resolveCharacter(Char).then((char) => {
				setupStealPlayerTimerPrompt(player, char);
				setupKillPlayerPrompt(player, char);
			});
		});
	});
}
