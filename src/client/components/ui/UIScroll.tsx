import { useMountEffect } from "@rbxts/pretty-react-hooks";
import React, {
	Binding,
	InstanceChangeEvent,
	InstanceEvent,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "@rbxts/react";

interface Props extends PropsWithChildren {
	Size?: UDim2 | Binding<UDim2>;
	Position?: UDim2 | Binding<UDim2>;
	AnchorPoint?: Vector2 | Binding<Vector2>;

	ScrollDirection?: "Vertical" | "Horizontal";
	Padding?: UDim;
}

export function UIScrollContainer({
	Size,
	Position,
	AnchorPoint,
	ScrollDirection = "Vertical",
	Padding = new UDim(0.02),
	children,
}: Props) {
	const [contentSize, updateContentSize] = useState(new UDim2(0, 0, 0, 0));
	const listLayoutRef = useRef<UIListLayout>(undefined);

	function update() {
		const listLayout = listLayoutRef.current;
		if (listLayout === undefined) {
			return;
		}
		updateContentSize(
			new UDim2(
				ScrollDirection === "Vertical" ? 0 : Padding.Scale,
				ScrollDirection === "Vertical" ? 0 : listLayout.AbsoluteContentSize.X - Padding.Offset,
				ScrollDirection === "Vertical" ? Padding.Scale : Padding.Scale,
				ScrollDirection === "Vertical" ? listLayout.AbsoluteContentSize.Y - Padding.Offset : 0,
			),
		);
	}

	useEffect(() => {
		const listLayout = listLayoutRef.current;
		if (listLayout !== undefined) {
			update();
		}
	}, [listLayoutRef]);

	const Event: InstanceEvent<UIListLayout> = {
		ChildAdded: (listLayout) => {
			update();
		},
		ChildRemoved: (listLayout) => {
			update();
		},
	};

	const scollFrameChange: InstanceChangeEvent<ScrollingFrame> = {
		AbsoluteSize: (scoll) => update(),
	};

	return (
		<scrollingframe
			Size={Size}
			Position={Position}
			AnchorPoint={AnchorPoint}
			BackgroundTransparency={1}
			CanvasSize={contentSize}
			ScrollBarThickness={4}
			ScrollBarImageColor3={new Color3(0.34, 0.34, 0.34)}
			ScrollingDirection={ScrollDirection === "Vertical" ? Enum.ScrollingDirection.Y : Enum.ScrollingDirection.X}
			AutomaticCanvasSize={ScrollDirection === "Vertical" ? Enum.AutomaticSize.Y : Enum.AutomaticSize.X}
			Change={scollFrameChange}
		>
			<uilistlayout
				FillDirection={
					ScrollDirection === "Vertical" ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal
				}
				Padding={Padding}
				Event={Event}
				ref={listLayoutRef}
				HorizontalAlignment={
					ScrollDirection === "Vertical" ? Enum.HorizontalAlignment.Center : Enum.HorizontalAlignment.Left
				}
				VerticalAlignment={
					ScrollDirection === "Vertical" ? Enum.VerticalAlignment.Top : Enum.VerticalAlignment.Center
				}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			{children}
		</scrollingframe>
	);
}
