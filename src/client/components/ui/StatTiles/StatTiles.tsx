import React from "@rbxts/react";
import { StatTile } from "./StatTile";
import { useProducer, useSelectorCreator } from "@rbxts/react-reflex";
import { selectDataSlice, selectPlayerData, selectPlayerEntry } from "shared/store/data/data-selectors";
import { Players } from "@rbxts/services";
import { clientStore } from "client/store";
import { Colors } from "client/constants/theme";
import { AbbreviateNumber, toHMS } from "shared/utils/number-utils";

export function StatTiles() {
	const playerTokens = useSelectorCreator(selectPlayerEntry, Players.LocalPlayer, "tokens");
	const playerTimer = useSelectorCreator(selectPlayerEntry, Players.LocalPlayer, "currentTimer");
	return (
		<frame
			Size={UDim2.fromScale(0.99, 0.99)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
		>
			<uilistlayout
				HorizontalAlignment={Enum.HorizontalAlignment.Left}
				VerticalAlignment={Enum.VerticalAlignment.Bottom}
				Padding={new UDim(0.01, 0)}
				SortOrder={Enum.SortOrder.Name}
			/>
			<StatTile
				Size={UDim2.fromScale(0.15, 1)}
				Position={UDim2.fromScale(0.01, 0.9)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundColor3={Colors.Background}
				ContentText={playerTimer !== undefined ? toHMS(playerTimer) : "Loading..."}
				ShowButton={false}
				Icon="🕑"
			/>
			<StatTile
				Size={UDim2.fromScale(0.15, 1)}
				Position={UDim2.fromScale(0.01, 0.99)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundColor3={Colors.Background}
				ContentText={playerTokens !== undefined ? AbbreviateNumber(playerTokens) : "Loading..."}
				ShowButton={true}
				Icon="💴"
				ButtonCallback={() => {
					clientStore.setPage("shop");
				}}
			/>
		</frame>
	);
}
