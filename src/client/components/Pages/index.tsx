import React from "@rbxts/react";
import { MenuWindow } from "./MenuWindow";
import { Colors } from "client/constants/theme";
import { Shop } from "./Shop";
import { ConfirmationWindow } from "./PurchaseConfirmation";

export function PagesContainer() {
	return (
		<>
			<MenuWindow Color={Colors.Shop} Name="Shop" page="shop">
				<Shop />
			</MenuWindow>
			<MenuWindow
				Size={UDim2.fromScale(1, 0.5)}
				Color={Colors.Background}
				BorderColor={Color3.fromRGB(75, 75, 75)}
				Name="Confirmation"
				page="confirmation"
			>
				<ConfirmationWindow />
			</MenuWindow>
		</>
	);
}
