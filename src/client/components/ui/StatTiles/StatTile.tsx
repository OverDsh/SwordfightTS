import React, { Binding } from "@rbxts/react";
import { Colors, Fonts } from "client/constants/theme";
import { DynamicButton } from "../DynamicButton";

interface Props {
	Size: UDim2 | Binding<UDim2>;
	Position: UDim2 | Binding<UDim2>;
	AnchorPoint: Vector2 | Binding<Vector2>;
	BackgroundColor3: Color3 | Binding<Color3>;

	Icon?: string;
	ContentText: string;

	ShowButton?: boolean;
	ButtonCallback?: () => void;
}

export function StatTile({
	Size = UDim2.fromScale(0.15, 0.1),
	Position,
	AnchorPoint = new Vector2(0.5, 0.5),
	BackgroundColor3,
	Icon,
	ContentText,

	ShowButton = false,
	ButtonCallback = () => print("Clicked"),
}: Props) {
	return (
		<frame Size={Size} Position={Position} AnchorPoint={AnchorPoint} BackgroundColor3={BackgroundColor3}>
			<textlabel
				Size={UDim2.fromScale(0.15, 0.6)}
				Position={UDim2.fromScale(0.1, 0.5)}
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				Text={Icon}
				TextScaled={true}
			/>
			<textlabel
				Size={UDim2.fromScale(0.4, 0.4)}
				Position={UDim2.fromScale(0.5, 0.5)}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Fonts.Title}
				TextScaled={true}
				Text={ContentText}
				TextColor3={new Color3(1, 1, 1)}
			/>
			<DynamicButton
				Size={UDim2.fromScale(0.2, 1)}
				Position={UDim2.fromScale(0.95, 0.5)}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundColor3={Colors.PurchaseGreen}
				AnimationStrenght={-2}
				Activated={ShowButton}
				Transparency={ShowButton ? 0 : 1}
				onClick={ButtonCallback}
			>
				<uiaspectratioconstraint AspectRatio={1} />
				<textlabel
					Size={UDim2.fromScale(0.8, 0.8)}
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					Text={"+"}
					BackgroundTransparency={1}
					TextColor3={new Color3(1, 1, 1)}
					Font={Fonts.Title}
					TextScaled={true}
					TextTransparency={ShowButton ? 0 : 1}
				/>
			</DynamicButton>
			<uicorner CornerRadius={new UDim(0.2, 0)} />
			<uiaspectratioconstraint AspectRatio={2.7} />
		</frame>
	);
}
