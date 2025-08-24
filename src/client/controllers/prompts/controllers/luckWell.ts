import { Workspace } from "@rbxts/services";
import { PromptTokenPurchase } from "client/components/Pages/PurchaseConfirmation";

export function initWellPrompt() {
	const WellPromptPart = Workspace.WaitForChild("Well", 10)?.WaitForChild("PromptPart", 10);
	if (!WellPromptPart) {
		warn("Well prompt part not found");
		return;
	}
	const Prompt = new Instance("ProximityPrompt");
	Prompt.ActionText = "Make a wish";
	Prompt.Parent = WellPromptPart;
	Prompt.MaxActivationDistance = 20;
	Prompt.RequiresLineOfSight = false;
	Prompt.ClickablePrompt = false;

	Prompt.Triggered.Connect(() => PromptTokenPurchase(3, []));
}
