import { Players, Debris } from "@rbxts/services";
import { selectPlayerEntry } from "shared/store/data/data-selectors";
import { serverStore } from "../store";
import { MessageClient } from "shared/utils/player-utils";

const Tool = script.Parent as Tool;
const Handle = Tool.WaitForChild("Handle") as BasePart;

const BaseUrl = "rbxassetid://";

const DamageValues = {
	BaseDamage: 5,
	SlashDamage: 10,
	LungeDamage: 30,
};

const Animations = {
	R15Slash: 522635514,
	R15Lunge: 522638767,
};

let Damage = DamageValues.BaseDamage;

const Grips = {
	Up: new CFrame(0, 0, -1.7, 0, 0, 1, 1, 0, 0, 0, 1, 0),
	Out: new CFrame(0, 0, -1.7, 0, 1, 0, 1, 0, 0, 0, 0, -1),
};

const Sounds = {
	Slash: Handle.WaitForChild("SwordSlash") as Sound,
	Lunge: Handle.WaitForChild("SwordLunge") as Sound,
	Unsheath: Handle.WaitForChild("Unsheath") as Sound,
};

let ToolEquipped = false;
let Character: Model | undefined;
let Player: Player | undefined;
let Humanoid: Humanoid | undefined;
let Torso: BasePart | undefined;
let LastAttack = 0;

// Set particle emitters for Omega Rainbow Katana thumbnail
Handle.GetChildren().forEach((child) => {
	if (child.IsA("ParticleEmitter")) {
		child.Rate = 20;
	}
});

Tool.Grip = Grips.Up;
Tool.Enabled = true;

function tagHumanoid(humanoid: Humanoid, player: Player): void {
	const creatorTag = new Instance("ObjectValue");
	creatorTag.Name = "creator";
	creatorTag.Value = player;
	Debris.AddItem(creatorTag, 2);
	creatorTag.Parent = humanoid;
}

function untagHumanoid(humanoid: Humanoid): void {
	humanoid.GetChildren().forEach((child) => {
		if (child.IsA("ObjectValue") && child.Name === "creator") {
			child.Destroy();
		}
	});
}

function blow(hit: Instance): void {
	if (!hit || !hit.Parent || !checkIfAlive() || !ToolEquipped) return;

	const rightArm = Character?.FindFirstChild("Right Arm") || Character?.FindFirstChild("RightHand");
	if (!rightArm || !rightArm.IsA("BasePart")) return;

	const rightGrip = rightArm.FindFirstChild("RightGrip") as Weld | undefined;
	if (!rightGrip || (rightGrip.Part0 !== Handle && rightGrip.Part1 !== Handle)) return;

	const character = hit.Parent as Model;
	if (character === Character) return;

	const humanoid = character.FindFirstChildOfClass("Humanoid");
	if (!humanoid || humanoid.Health <= 0) return;

	const player = Players.GetPlayerFromCharacter(character);
	if (!player || !Player) return;
	if (player === Player || player.GetAttribute("inSafezone") === true || Player?.GetAttribute("inSafezone") === true)
		return;

	untagHumanoid(humanoid);
	tagHumanoid(humanoid, Player!);
	humanoid.TakeDamage(Damage);
	if (humanoid.Health <= 0) {
		if (!Player) return;
		const oldTargetTimer = serverStore.getState(selectPlayerEntry(player, "currentTimer"));
		serverStore.setPlayerDataEntry(player, "currentTimer", 0);
		serverStore.addPlayerDataEntry(Player, "currentTimer", oldTargetTimer ?? 0);
		MessageClient(player, `You were killed by <font color="#ff5733">@${Player.Name}</font>`);
		MessageClient(Player, `You killed <font color="#ff5733">@${player.Name}</font>`);
	}
}

function attack(): void {
	Damage = DamageValues.SlashDamage;
	Sounds.Slash.Play();

	if (Humanoid) {
		if (Humanoid.RigType === Enum.HumanoidRigType.R6) {
			const anim = new Instance("StringValue");
			anim.Name = "toolanim";
			anim.Value = "Slash";
			anim.Parent = Tool;
		} else if (Humanoid.RigType === Enum.HumanoidRigType.R15) {
			const anim = Tool.FindFirstChild("R15Slash") as Animation;
			if (anim) {
				const track = Humanoid.LoadAnimation(anim);
				track.Play(0);
			}
		}
	}
}

function lunge(): void {
	Damage = DamageValues.LungeDamage;
	Sounds.Lunge.Play();

	if (Humanoid) {
		if (Humanoid.RigType === Enum.HumanoidRigType.R6) {
			const anim = new Instance("StringValue");
			anim.Name = "toolanim";
			anim.Value = "Lunge";
			anim.Parent = Tool;
		} else if (Humanoid.RigType === Enum.HumanoidRigType.R15) {
			const anim = Tool.FindFirstChild("R15Lunge") as Animation;
			if (anim) {
				const track = Humanoid.LoadAnimation(anim);
				track.Play(0);
			}
		}
	}

	wait(0.2);
	Tool.Grip = Grips.Out;
	wait(0.6);
	Tool.Grip = Grips.Up;

	Damage = DamageValues.SlashDamage;
}

function activated(): void {
	if (!Tool.Enabled || !ToolEquipped || !checkIfAlive()) return;

	Tool.Enabled = false;
	const Tick = tick();
	if (Tick - LastAttack < 0.2) {
		lunge();
	} else {
		attack();
	}
	LastAttack = Tick;

	Damage = DamageValues.BaseDamage;

	if (!Tool.FindFirstChild("R15Slash")) {
		const slashAnim = new Instance("Animation");
		slashAnim.Name = "R15Slash";
		slashAnim.AnimationId = `${BaseUrl}${Animations.R15Slash}`;
		slashAnim.Parent = Tool;
	}

	if (!Tool.FindFirstChild("R15Lunge")) {
		const lungeAnim = new Instance("Animation");
		lungeAnim.Name = "R15Lunge";
		lungeAnim.AnimationId = `${BaseUrl}${Animations.R15Lunge}`;
		lungeAnim.Parent = Tool;
	}

	Tool.Enabled = true;
}

function checkIfAlive(): boolean {
	return !!(
		Player &&
		Player.Parent &&
		Character &&
		Character.Parent &&
		Humanoid &&
		Humanoid.Parent &&
		Humanoid.Health > 0 &&
		Torso &&
		Torso.Parent
	);
}

function equipped(): void {
	Character = Tool.Parent as Model;
	Player = Players.GetPlayerFromCharacter(Character);
	Humanoid = Character?.FindFirstChildOfClass("Humanoid") as Humanoid;
	Torso = (Character?.FindFirstChild("Torso") || Character?.FindFirstChild("HumanoidRootPart")) as BasePart;
	if (!checkIfAlive()) return;

	ToolEquipped = true;
	Sounds.Unsheath.Play();
}

function unequipped(): void {
	Tool.Grip = Grips.Up;
	ToolEquipped = false;
}

Tool.Activated.Connect(activated);
Tool.Equipped.Connect(equipped);
Tool.Unequipped.Connect(unequipped);
Handle.Touched.Connect(blow);
