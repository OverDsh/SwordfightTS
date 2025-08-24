import React, { useMemo } from "@rbxts/react";
import { MarketplaceService, Players } from "@rbxts/services";
import { DynamicButton } from "client/components/ui/DynamicButton";
import { Colors, Fonts } from "client/constants/theme";
import { brighten } from "shared/utils/color-utils";

export function ShopButton({
	RewardText,
	productID,
	Color,
	Type,
}: {
	RewardText: string;
	productID: number;
	Color: Color3;
	Type: Enum.InfoType.GamePass | Enum.InfoType.Product;
}) {
	const Info = useMemo(() => {
		try {
			if (Type === Enum.InfoType.Product) {
				return MarketplaceService.GetProductInfo(productID, Enum.InfoType.Product).PriceInRobux;
			} else {
				if (MarketplaceService.UserOwnsGamePassAsync(Players.LocalPlayer.UserId, productID)) {
					return "Owned";
				} else {
					return MarketplaceService.GetProductInfo(productID, Enum.InfoType.GamePass).PriceInRobux;
				}
			}
		} catch (e) {
			warn(e);
		}
	}, []);
	return (
		<DynamicButton
			Size={UDim2.fromScale(0.2, 0.4)} // Makes an aspect ratio of 0.8
			BackgroundColor3={Color}
			CornerRadius={new UDim(0.1, 0)}
			OutlineColor={brighten(Color, 1)}
			AspectRatio={0.8}
			OutlineThickness={3}
			onClick={() => {
				if (Type === Enum.InfoType.Product) {
					MarketplaceService.PromptProductPurchase(Players.LocalPlayer, productID);
				} else {
					if (Type === Enum.InfoType.GamePass) {
						MarketplaceService.PromptGamePassPurchase(Players.LocalPlayer, productID);
					}
				}
			}}
		>
			<textlabel
				Size={UDim2.fromScale(0.9, 0.3)}
				Position={UDim2.fromScale(0.5, 0.1)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				TextScaled={true}
				TextColor3={Colors.Text}
				Font={Fonts.Header}
				Text={RewardText}
			/>
			<frame
				Size={UDim2.fromScale(0.5, 0.2)}
				Position={UDim2.fromScale(0.5, 0.9)}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={new Color3(0, 0, 0)}
			>
				<uicorner CornerRadius={new UDim(1, 0)} />
				<textlabel
					Size={UDim2.fromScale(0.7, 0.6)}
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					TextColor3={Colors.Text}
					TextScaled={true}
					Font={Fonts.Header}
					BackgroundTransparency={1}
					Text={`\u{E002} ${Info ?? "Error"}`}
				/>
			</frame>
		</DynamicButton>
	);
}
