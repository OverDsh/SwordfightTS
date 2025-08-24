import { serverStore } from "server/store";
import { selectPlayerEntry } from "shared/store/data/data-selectors";
import { toHMS } from "shared/utils/number-utils";
import { onPlayerAdded } from "shared/utils/player-utils";

export async function initLeaderstatsService() {
	function updateHighestTime(player: Player) {
		serverStore.subscribe(selectPlayerEntry(player, "currentTimer"), (time) => {
			const highestTime = serverStore.getState(selectPlayerEntry(player, "highestTime"));
			if (highestTime === undefined || time === undefined) {
				return;
			}

			if (time >= highestTime) {
				serverStore.setPlayerDataEntry(player, "highestTime", time);
			}
		});
	}
	function makeLeaderstat(player: Player) {
		const LeaderstatFolder = new Instance("Folder");
		LeaderstatFolder.Name = "leaderstats";
		LeaderstatFolder.Parent = player;

		const TimerStat = new Instance("StringValue");
		TimerStat.Name = "Timer";
		TimerStat.Parent = LeaderstatFolder;
		serverStore.subscribe(selectPlayerEntry(player, "currentTimer"), (time) => {
			TimerStat.Value = toHMS(time ?? 0);
		});

		const BestTimeStat = new Instance("StringValue");
		BestTimeStat.Name = "Highest Time";
		BestTimeStat.Parent = LeaderstatFolder;
		serverStore.subscribe(selectPlayerEntry(player, "highestTime"), (time) => {
			BestTimeStat.Value = toHMS(time ?? 0);
		});
	}
	onPlayerAdded((player) => {
		updateHighestTime(player);
		makeLeaderstat(player);
	});
}
