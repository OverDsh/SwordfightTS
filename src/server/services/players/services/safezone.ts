import { CollectionService } from "@rbxts/services";
import { Zone } from "@rbxts/zone-plus";

export function initSafezoneService() {
	for (const zonePart of CollectionService.GetTagged("Safezone")) {
		if (!zonePart.IsA("BasePart")) {
			continue;
		}
		const zone = new Zone(zonePart);

		zone.playerEntered.Connect((player) => {
			player.SetAttribute("inSafezone", true);
		});

		zone.playerExited.Connect((player) => {
			player.SetAttribute("inSafezone", false);
		});
	}
}
