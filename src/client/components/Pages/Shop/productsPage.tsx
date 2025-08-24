import React, { useMemo } from "@rbxts/react";
import { MarketplaceService, Players } from "@rbxts/services";
import { DynamicButton } from "client/components/ui/DynamicButton";
import { Colors, Fonts } from "client/constants/theme";
import { DevProduct } from "shared/assets/products";
import { brighten } from "shared/utils/color-utils";
import { ShopButton } from "./shopButton";

export function ProductsPage() {
	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Wraps={true}
				Padding={new UDim(0.04)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>

			<ShopButton
				RewardText="Bronze\n50 Tokens"
				productID={DevProduct.Token50}
				Color={Color3.fromRGB(206, 137, 70)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Silver\n100 Tokens"
				productID={DevProduct.Token100}
				Color={Color3.fromRGB(217, 217, 217)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Gold\n200 Tokens"
				productID={DevProduct.Token200}
				Color={Color3.fromRGB(239, 191, 4)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Ruby\n500 Tokens"
				productID={DevProduct.Token500}
				Color={Color3.fromRGB(178, 34, 34)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Jade\n1K Tokens"
				productID={DevProduct.Token1000}
				Color={Color3.fromRGB(0, 187, 119)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Diamond\n2K Tokens"
				productID={DevProduct.Token2000}
				Color={Color3.fromRGB(181, 199, 235)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="Anti Matter\n5K Tokens"
				productID={DevProduct.Token5000}
				Color={Color3.fromRGB(108, 59, 170)}
				Type={Enum.InfoType.Product}
			/>
			<ShopButton
				RewardText="???\n10K Tokens"
				productID={DevProduct.Token10000}
				Color={Color3.fromRGB(3, 7, 30)}
				Type={Enum.InfoType.Product}
			/>
		</frame>
	);
}
