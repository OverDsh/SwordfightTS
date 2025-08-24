import { MarketplaceService, Players } from "@rbxts/services";
import { remotes } from "shared/remotes";
import { MessageClient } from "shared/utils/player-utils";

const callbacks = new Map<number, (player: Player) => void>();

interface ThroawayType {
	[id: number]:
		| {
				[productId: number]:
					| { callback: (player: Player, ...args: unknown[]) => void; args: unknown[] }
					| undefined;
		  }
		| undefined;
}
const ThroawayPlayerCallbacks: ThroawayType = [];

MarketplaceService.ProcessReceipt = (info) => {
	const Player = Players.GetPlayerByUserId(info.PlayerId);
	const PurchaseCallback = callbacks.get(info.ProductId);

	if (!Player || !PurchaseCallback) {
		return Enum.ProductPurchaseDecision.NotProcessedYet;
	}

	const [success, message] = pcall(PurchaseCallback, Player);
	if (success) {
		MessageClient(Player, `Your purchase was accepted! <font color="#ff5733">Thanks for your support</font> ❤️`);
		return Enum.ProductPurchaseDecision.PurchaseGranted;
	} else {
		warn(message);
		MessageClient(
			Player,
			"Error when processing your purchase. Your purchase has been queued, please rejoin the game",
		);
		return Enum.ProductPurchaseDecision.NotProcessedYet;
	}
};

export function bindProductToCallback(id: number, callback: (player: Player) => void) {
	if (callbacks.has(id)) {
		warn(`The productId ${id} is already bound to a callback, the old callback has been replaced.`);
	}
	callbacks.set(id, callback);
}
