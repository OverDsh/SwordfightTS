import { lerpBinding, useBindingState, useMotion } from "@rbxts/pretty-react-hooks";
import React, { Binding, InstanceEvent, PropsWithChildren, useEffect, useState } from "@rbxts/react";

interface Props extends PropsWithChildren {
	Size?: UDim2 | Binding<UDim2>;
	Position?: UDim2 | Binding<UDim2>;
	AnchorPoint?: Vector2 | Binding<Vector2>;
	Rotation?: number | Binding<number>;
	LayoutOrder?: number;

	Transparency?: number | Binding<number>;
	Activated?: boolean | Binding<boolean>;
	BackgroundColor3?: Color3 | Binding<Color3>;
	CornerRadius?: UDim | Binding<UDim>;
	AspectRatio?: number | Binding<number>;

	OutlineColor?: Color3;
	OutlineThickness?: number;

	AnimationDirection?: Vector2;
	AnimationStrenght?: number;

	onClick: () => void;
}

export function DynamicButton({
	Size,
	Position,
	AnchorPoint,
	Rotation,
	LayoutOrder,
	Transparency = 0,
	Activated = true,
	BackgroundColor3,
	CornerRadius = new UDim(0.3, 0),
	AspectRatio,
	OutlineColor,
	OutlineThickness = 0,
	AnimationDirection = Vector2.yAxis,
	AnimationStrenght = -6,
	onClick,
	children,
}: Props) {
	const ActivatedState = useBindingState(Activated);

	const [positionAnimation, positionAnimationMotion] = useMotion(0);
	const [hovering, updateHovering] = useState(false);
	const [holding, updateHolding] = useState(false);

	useEffect(() => {
		if (hovering) {
			if (holding) {
				positionAnimationMotion.spring(0, { tension: 400 });
			} else {
				positionAnimationMotion.spring(1, { tension: 400 });
			}
		} else {
			positionAnimationMotion.spring(0, { tension: 400 });
			updateHolding(false);
		}
	}, [hovering, holding]);

	const Events: InstanceEvent<ImageButton> = {
		MouseEnter: () => updateHovering(true),
		MouseLeave: () => updateHovering(false),
		MouseButton1Down: () => updateHolding(true),
		MouseButton1Up: () => updateHolding(false),
		Activated: () => onClick(),
	};

	return (
		<frame
			Size={Size}
			Position={Position}
			AnchorPoint={AnchorPoint}
			BackgroundTransparency={1}
			ZIndex={LayoutOrder}
			Rotation={Rotation}
		>
			<imagebutton
				AutoButtonColor={false}
				Size={UDim2.fromScale(1, 1)}
				Position={lerpBinding(
					ActivatedState ? positionAnimation : 0,
					UDim2.fromScale(0.5, 0.5),
					new UDim2(
						0.5,
						AnimationStrenght * AnimationDirection.X,
						0.5,
						AnimationStrenght * AnimationDirection.Y,
					),
				)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Event={Events}
				BackgroundTransparency={Transparency}
				BackgroundColor3={BackgroundColor3}
				Active={Activated}
				ZIndex={LayoutOrder}
			>
				<uicorner CornerRadius={CornerRadius} />
				<uistroke Thickness={OutlineThickness} Color={OutlineColor} Transparency={Transparency} />
				{children}
			</imagebutton>
			{AspectRatio !== undefined ? (
				<uiaspectratioconstraint AspectRatio={AspectRatio} AspectType={Enum.AspectType.ScaleWithParentSize} />
			) : undefined}
		</frame>
	);
}
