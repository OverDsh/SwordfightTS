import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { UIScrollContainer } from "client/components/ui/UIScroll";
import React from "@rbxts/react";

export = hoarcekat(() => {
	return (
		<UIScrollContainer
			Size={UDim2.fromScale(0.5, 0.5)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Padding={new UDim(0, 20)}
			ScrollDirection="Horizontal"
		>
			<textlabel Size={UDim2.fromScale(1, 1)} />
			<textlabel Size={UDim2.fromScale(1, 1)} />
			<textlabel Size={UDim2.fromScale(1, 1)} />
			<textlabel Size={UDim2.fromScale(1, 1)} />
			<textlabel Size={UDim2.fromScale(1, 1)} />
		</UIScrollContainer>
	);
});
