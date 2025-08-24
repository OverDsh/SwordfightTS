import { hoarcekat } from "@rbxts/pretty-react-hooks";
import { StatTile } from "client/components/ui/StatTiles/StatTile";
import React from "@rbxts/react";

export = hoarcekat(() => {
	return (
		<StatTile
			Size={UDim2.fromScale(0.15, 1)}
			Position={UDim2.fromScale(0.5, 0.5)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(38, 38, 38)}
			ContentText="100B"
			Icon="rbxassetid://96705278151629"
			ShowButton={true}
		/>
	);
});
