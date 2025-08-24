import { StarterGui } from "@rbxts/services";

// eslint-disable-next-line no-constant-condition
while (true) {
	const success = pcall(() => {
		StarterGui.SetCore("ResetButtonCallback", false);
	});

	if (success[0]) {
		break;
	}
	task.wait(1);
}
