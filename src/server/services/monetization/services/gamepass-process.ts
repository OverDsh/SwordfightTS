import { MarketplaceService } from "@rbxts/services";
import { MessageClient, onPlayerAdded } from "shared/utils/player-utils";

const callbacks = new Map<number, (player: Player) => void>();

onPlayerAdded((player) => [
	callbacks.forEach((callback, id) => {
		if (MarketplaceService.UserOwnsGamePassAsync(player.UserId, id)) {
			callback(player);
		}
	}),
]);

MarketplaceService.PromptGamePassPurchaseFinished.Connect((player, id, sucess) => {
	if (!sucess) return;
	const PurchaseCallback = callbacks.get(id);
	if (!PurchaseCallback) return;

	PurchaseCallback(player);
	MessageClient(player, `Your purchase was accepted! <font color="#ff5733">Thanks for your support</font> ❤️`);
});

export function bindPassToCallback(id: number, callback: (player: Player) => void) {
	if (callbacks.has(id)) {
		warn(`The productId ${id} is already bound to a callback, the old callback has been replaced.`);
	}
	callbacks.set(id, callback);
}
