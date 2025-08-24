import { Players, TextChatService } from "@rbxts/services";

export function initVipTagController() {
	TextChatService.OnIncomingMessage = (message) => {
		const Props = new Instance("TextChatMessageProperties");

		if (!message.TextSource) return Props;

		const sendingPlayer = Players.GetPlayerByUserId(message.TextSource.UserId);
		if (!sendingPlayer) return Props;
		if (!sendingPlayer.HasTag("VIP")) return Props;

		Props.PrefixText = `<font color='#e6b000'>[VIP]</font> ${message.PrefixText}`;
		return Props;
	};
}
