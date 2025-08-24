import { ServerStorage } from "@rbxts/services";
import { serverStore } from "server/store";
import { selectPlayerEntry } from "shared/store/data/data-selectors";
import { toHMS } from "shared/utils/number-utils";
import { Character, onPlayerAdded, resolveCharacter } from "shared/utils/player-utils";

type TimerUi = BillboardGui & {
	TimerText: TextLabel;
};

function SetupTimerBillboardGui(player: Player, character: Character): TimerUi {
	const selectTimer = selectPlayerEntry(player, "currentTimer");

	const Timer = ServerStorage.Assets.Timer.Clone();
	Timer.Parent = character.FindFirstChild("Head");

	const TimerText = Timer.TimerText;
	const CurrentTime = serverStore.getState(selectTimer);
	TimerText.Text = CurrentTime !== undefined ? toHMS(CurrentTime) : "Loading...";

	serverStore.subscribe(selectTimer, (time) => {
		TimerText.Text = time !== undefined ? toHMS(time) : "Loading...";
	});

	return Timer;
}

export async function initCharacterService() {
	onPlayerAdded((player) => {
		player.CharacterAdded.Connect((character) => {
			resolveCharacter(character).then((character) => {
				SetupTimerBillboardGui(player, character);
			});
		});
	});
}
