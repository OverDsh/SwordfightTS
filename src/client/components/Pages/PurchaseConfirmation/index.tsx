import React from "@rbxts/react";
import { useSelector } from "@rbxts/react-reflex";
import { StaticButton } from "client/components/ui/StaticButton";
import { Colors, Fonts } from "client/constants/theme";
import { clientStore } from "client/store";
import { selectCurrentTransaction } from "client/store/ui/ui-selectors";
import { tokenProducts } from "shared/assets/tokenProducts";
import { remotes } from "shared/remotes";

export function PromptTokenPurchase(id: number, args: unknown[]) {
	const info = tokenProducts[id];
	if (!info) {
		warn("Product doesn't exist");
		return;
	}
	clientStore.setCurrentTransaction({ ID: id, Price: info.Price, Name: info.Name, Args: args });
	clientStore.setPage("confirmation");
}

export function ConfirmationWindow() {
	const currentTransaction = useSelector(selectCurrentTransaction);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<textlabel
				Size={UDim2.fromScale(0.8, 0.4)}
				Position={UDim2.fromScale(0.5, 0.1)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Fonts.Header}
				TextColor3={Colors.Text}
				TextScaled={true}
				RichText={true}
				Text={`Do you want to purchase <font color="#f3be0b">${currentTransaction.Name}</font>?`}
			/>
			<StaticButton
				Size={UDim2.fromScale(0.8, 0.2)}
				Position={UDim2.fromScale(0.5, 0.9)}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundColor3={Colors.Accent}
				onClick={() => {
					remotes.server.purchaseTokenProduct({ ID: currentTransaction.ID, args: currentTransaction.Args });
					clientStore.setPage("");
				}}
			>
				<textlabel
					Size={UDim2.fromScale(0.9, 0.6)}
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Font={Fonts.Title}
					TextColor3={Colors.Text}
					TextScaled={true}
					Text={`💴 ${currentTransaction.Price}`}
				/>
			</StaticButton>
		</frame>
	);
}
