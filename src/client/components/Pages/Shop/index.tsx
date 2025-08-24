import React from "@rbxts/react";
import { MenuWindow } from "../MenuWindow";
import { Colors, Fonts } from "client/constants/theme";
import { ProductsPage } from "./productsPage";
import { UIScrollContainer } from "client/components/ui/UIScroll";
import { PassPage } from "./passPage";

export function Shop() {
	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<UIScrollContainer Size={UDim2.fromScale(1, 1)} Padding={new UDim(0, 0)} ScrollDirection="Vertical">
				<frame Size={UDim2.fromScale(0, 0.03)} BackgroundTransparency={1} />

				<ProductsPage />
				<textlabel
					Size={UDim2.fromScale(0.9, 0.06)}
					BackgroundTransparency={1}
					TextScaled={true}
					Font={Fonts.Title}
					TextColor3={Colors.Text}
					Text={"Passes"}
				/>
				<PassPage />
			</UIScrollContainer>
		</frame>
	);
}
