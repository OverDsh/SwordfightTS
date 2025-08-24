import { Players } from "@rbxts/services";
import { promiseTree } from "@rbxts/validate-tree";
import { remotes } from "shared/remotes";

export interface Character extends Model {
	HumanoidRootPart: BasePart;
	Humanoid: Humanoid & {
		Animator: Animator;
	};
}

const CharTree = {
	$className: "Model",
	HumanoidRootPart: "BasePart",
	Humanoid: {
		$className: "Humanoid",
		Animator: "Animator",
	},
} as const;

export async function resolveCharacter(character: Model): Promise<Character> {
	return await promiseTree(character, CharTree).timeout(20);
}

export async function playerDisconnectedPromise(player: Player): Promise<void> {
	if (!player.IsDescendantOf(Players)) {
		return;
	}

	const newPromise = new Promise((resolve, reject) => {
		Players.PlayerRemoving.Once((playerRemoving) => {
			if (playerRemoving === player) {
				resolve(undefined);
			}
		});
		game.BindToClose(() => resolve(undefined));
	});

	await newPromise;
}

export function onPlayerAdded(callback: (player: Player) => void): RBXScriptConnection {
	const connection = Players.PlayerAdded.Connect(callback);
	for (const player of Players.GetPlayers()) {
		callback(player);
	}
	return connection;
}

export function MessageClient(player: Player, message: string) {
	remotes.client.sendNotice.fire(player, { message: message });
}
