import { lerpBinding, useBindingState, useMotion } from "@rbxts/pretty-react-hooks";
import React, { Binding, InstanceEvent, PropsWithChildren, useEffect, useState } from "@rbxts/react";

interface Props extends PropsWithChildren {
	Size?: UDim2 | Binding<UDim2>;
	Position?: UDim2 | Binding<UDim2>;
	AnchorPoint?: Vector2 | Binding<Vector2>;
	LayoutOrder?: number;

	Transparency?: number | Binding<number>;
	Activated?: boolean | Binding<boolean>;
	BackgroundColor3?: Color3 | Binding<Color3>;

	OutlineColor?: Color3;
	OutlineThickness?: number;

	AnimationDirection?: Vector2;
	AnimationStrenght?: number;

	onClick: () => void;
	onHover?: (hovering: boolean) => void;
}

export function StaticButton({
	Size,
	Position,
	AnchorPoint,
	LayoutOrder,
	Transparency = 0,
	Activated = true,
	BackgroundColor3,
	OutlineColor,
	OutlineThickness = 0,
	onClick,
	onHover = () => {},
	children,
}: Props) {
	const Events: InstanceEvent<ImageButton> = {
		Activated: () => onClick(),
		MouseEnter: () => onHover(true),
		MouseLeave: () => onHover(false),
	};

	return (
		<imagebutton
			AutoButtonColor={false}
			Size={Size}
			Position={Position}
			AnchorPoint={AnchorPoint}
			Event={Events}
			BackgroundTransparency={Transparency}
			BackgroundColor3={BackgroundColor3}
			Active={Activated}
			ZIndex={LayoutOrder}
		>
			<uicorner CornerRadius={new UDim(0.3, 0)} />
			<uistroke Thickness={OutlineThickness} Color={OutlineColor} Transparency={Transparency} />
			{children}
		</imagebutton>
	);
}
