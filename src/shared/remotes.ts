import { number } from "@rbxts/react/src/prop-types";
import { BroadcastAction } from "@rbxts/reflex";
import { Client, createRemotes, namespace, remote, Server } from "@rbxts/remo";
import { t } from "@rbxts/t";
import type { NoticeType } from "client/store/notice/notice-slice";

export const remotes = createRemotes({
	client: namespace({
		sendNotice: remote<Client, [params: Partial<NoticeType>]>(),
	}),
	server: namespace({
		purchaseTokenProduct: remote<Server, [Info: { ID: number; args: unknown[] }]>(),
	}),
	reflex_sync: namespace({
		dispatch: remote<Client, [actions: BroadcastAction[]]>(),
		start: remote<Server>(),
	}),
});
