/* eslint-disable no-constant-condition */
import { SoundService } from "@rbxts/services";
import { Icon } from "@rbxts/topbar-plus";

const themeSongs = [
	"rbxassetid://73613944967399",
	"rbxassetid://116492554936673",
	"rbxassetid://9046863960",
	"rbxassetid://9044564552",
	"rbxassetid://122138664583233",
	"rbxassetid://114213622974713",
];

export function initBackgroundMusicController() {
	const MusicInstance = new Instance("Sound");
	MusicInstance.Looped = false;
	MusicInstance.Parent = SoundService;
	MusicInstance.Name = "BackgroundMusic";
	MusicInstance.Volume = 2;

	const muteIcon = new Icon();
	muteIcon.setImage("http://www.roblox.com/asset/?id=6026671215", "Deselected");
	muteIcon.setImage("http://www.roblox.com/asset/?id=6026671224", "Selected");
	muteIcon.setCaption("Mute Music");
	muteIcon.bindToggleKey(Enum.KeyCode.M);
	muteIcon.align("Right");

	muteIcon.selected.Connect(() => {
		MusicInstance.Volume = 0;
	});
	muteIcon.deselected.Connect(() => {
		MusicInstance.Volume = 2;
	});

	let currentSong = math.random(0, themeSongs.size() - 1);
	while (true) {
		const selectedSongID = themeSongs[currentSong];

		MusicInstance.SoundId = selectedSongID;
		MusicInstance.Looped = false;
		MusicInstance.Play();

		MusicInstance.Ended.Wait();
		currentSong = (currentSong + 1) % themeSongs.size();
	}
}
