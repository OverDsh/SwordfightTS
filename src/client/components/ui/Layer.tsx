import React, { PropsWithChildren } from "@rbxts/react";

interface Props extends PropsWithChildren {
	DisplayOrder?: number;
	Enabled?: boolean;
	IgnoreGuiInset?: boolean;
}

let nextOrder = 0;

export function Layer({ DisplayOrder = nextOrder++, Enabled = true, IgnoreGuiInset = true, children }: Props) {
	return (
		<screengui
			DisplayOrder={DisplayOrder}
			Enabled={Enabled}
			IgnoreGuiInset={IgnoreGuiInset}
			ResetOnSpawn={false}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			{children}
		</screengui>
	);
}
