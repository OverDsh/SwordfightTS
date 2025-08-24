import { Lighting, TweenService } from "@rbxts/services";

const Blur = new Instance("BlurEffect");
Blur.Parent = Lighting;
Blur.Size = 0;

let currentTween: Tween | undefined = undefined;

const tweenInfo = new TweenInfo(0.1);

export function BlurScreen(Size: number) {
	if (currentTween) {
		currentTween.Cancel();
	}
	currentTween = TweenService.Create(Blur, tweenInfo, { Size: Size });
	currentTween.Play();
}
