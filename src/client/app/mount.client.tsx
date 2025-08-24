import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { App } from "./app";
import { clientStore } from "client/store";

const root = createRoot(new Instance("Folder"));
const PlayerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

root.render(
	createPortal(
		<StrictMode>
			<ReflexProvider producer={clientStore}>
				<App />
			</ReflexProvider>
		</StrictMode>,
		PlayerGui,
	),
);
