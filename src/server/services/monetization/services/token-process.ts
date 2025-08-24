import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { serverStore } from "server/store";
import { tokenProducts } from "shared/assets/tokenProducts";
import { remotes } from "shared/remotes";
import { selectPlayerEntry } from "shared/store/data/data-selectors";
import { resolveCharacter } from "shared/utils/player-utils";

const callbacks = new Map<number, { Price: number; Callback: (player: Player, ...args: unknown[]) => void }>();

function MessageClient(player: Player, message: string) {
	remotes.client.sendNotice.fire(player, { message: message });
}

function bindTokenProductToCallback(id: number, callback: (player: Player, ...args: unknown[]) => void) {
	if (!(id in tokenProducts)) {
		return;
	}
	if (callbacks.has(id)) {
		warn("Callback already bound to TokenID");
		return;
	}
	callbacks.set(id, { Price: tokenProducts[id].Price, Callback: callback });
}

export function initTokenService() {
	remotes.server.purchaseTokenProduct.connect((player, remoteInfo) => {
		const info = callbacks.get(remoteInfo.ID);
		if (!info) {
			MessageClient(player, "Could not process transaction. You have not been charged");
			return;
		}

		const price = info.Price;
		if ((serverStore.getState(selectPlayerEntry(player, "tokens")) ?? 0) < price) {
			MessageClient(player, "Insuficient balance");
			return;
		}
		serverStore.addPlayerDataEntry(player, "tokens", -price);
		const [sucess, err] = pcall(info.Callback, player, ...remoteInfo.args);
		if (!sucess) {
			serverStore.addPlayerDataEntry(player, "tokens", price);
			MessageClient(player, "There was an error while handling your purchase, you have not been charged");
			warn(err);
			return;
		}
		const Message = typeOf(err) === "string" ? err : "Purchase successful!";
		MessageClient(player, Message as string);
	});
}

bindTokenProductToCallback(1, (player: Player, targetId) => {
	const id = typeOf(targetId) === "number" ? tonumber(targetId) : undefined;
	if (id === undefined) {
		error("ID not found");
	}
	const TargetPlayer = Players.GetPlayerByUserId(id);
	if (!TargetPlayer) {
		error("No Player found (may have left)");
	}
	serverStore.setPlayerDataEntry(TargetPlayer, "currentTimer", 0);
	MessageClient(TargetPlayer, `<font color="#ff5733">@${player.Name}</font> has reset your timer!`);
});

bindTokenProductToCallback(2, (player, targetId) => {
	const id = typeOf(targetId) === "number" ? tonumber(targetId) : undefined;
	if (id === undefined) {
		error("ID not found");
	}
	const TargetPlayer = Players.GetPlayerByUserId(id);
	if (!TargetPlayer) {
		error("No Player found (may have left)");
	}
	const TargetPlayerTimer = serverStore.getState(selectPlayerEntry(TargetPlayer, "currentTimer"));
	if (TargetPlayerTimer === undefined) {
		error("Target player timer's not found");
	}
	serverStore.setPlayerDataEntry(TargetPlayer, "currentTimer", 0);
	serverStore.addPlayerDataEntry(player, "currentTimer", TargetPlayerTimer);
	MessageClient(TargetPlayer, `<font color="#ff5733">@${player.Name}</font> stole your timer!`);
});

bindTokenProductToCallback(3, (player) => {
	const luckyNumber = math.random(1, 2);
	if (luckyNumber !== 1) {
		return "Unlucky! You lost!";
	}
	serverStore.addPlayerDataEntry(player, "tokens", 100);
	return "You won!";
});
