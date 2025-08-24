import { DevProduct } from "shared/assets/products";
import { bindProductToCallback } from "./process-reciept";
import { Players } from "@rbxts/services";
import { MessageClient, resolveCharacter } from "shared/utils/player-utils";
import { serverStore } from "server/store";

function isPlayerVIP(player: Player) {
	if (player.HasTag("VIP")) {
		MessageClient(player, "You got 10% more tokens for being a VIP! Enjoy!");
		return true;
	}
}

export async function initProductService() {
	bindProductToCallback(DevProduct.Token50, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 55 : 50);
	});
	bindProductToCallback(DevProduct.Token100, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 110 : 100);
	});
	bindProductToCallback(DevProduct.Token200, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 220 : 200);
	});
	bindProductToCallback(DevProduct.Token500, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 550 : 500);
	});
	bindProductToCallback(DevProduct.Token1000, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 1100 : 1000);
	});
	bindProductToCallback(DevProduct.Token2000, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 2200 : 2000);
	});
	bindProductToCallback(DevProduct.Token5000, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 5500 : 5000);
	});
	bindProductToCallback(DevProduct.Token10000, (player) => {
		serverStore.addPlayerDataEntry(player, "tokens", isPlayerVIP(player) ? 11000 : 10000);
	});
}
