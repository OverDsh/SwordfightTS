import React from "@rbxts/react";
import { StatTiles } from "client/components/ui/StatTiles/StatTiles";
import { Layer } from "client/components/ui/Layer";
import { NoticesContainer } from "client/components/notice";
import { PagesContainer } from "client/components/Pages";

export function App() {
	return (
		<>
			<Layer>
				<StatTiles />
			</Layer>
			<Layer>
				<PagesContainer />
			</Layer>
			<Layer>
				<NoticesContainer />
			</Layer>
		</>
	);
}
