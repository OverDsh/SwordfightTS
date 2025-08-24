import React, { useMemo } from "@rbxts/react";
import { MarketplaceService, Players } from "@rbxts/services";
import { DynamicButton } from "client/components/ui/DynamicButton";
import { Colors, Fonts } from "client/constants/theme";
import { DevProduct } from "shared/assets/products";
import { brighten } from "shared/utils/color-utils";
import { ShopButton } from "./shopButton";

export function PassPage() {
	return (
		<frame Size={UDim2.fromScale(1, 0.5)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Wraps={true}
				Padding={new UDim(0.04)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			<ShopButton
				RewardText="VIP"
				productID={1010179048}
				Color={Color3.fromRGB(232, 191, 79)}
				Type={Enum.InfoType.GamePass}
			/>
			<ShopButton
				RewardText="2x Health"
				productID={1010099718}
				Color={Color3.fromRGB(235, 112, 97)}
				Type={Enum.InfoType.GamePass}
			/>
			<ShopButton
				RewardText="2x Speed"
				productID={1009614042}
				Color={Color3.fromRGB(97, 166, 235)}
				Type={Enum.InfoType.GamePass}
			/>
		</frame>
	);
}
