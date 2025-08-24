import { combineProducers, createBroadcastReceiver, InferState } from "@rbxts/reflex";
import { noticeSlice } from "./notice/notice-slice";
import { remotes } from "shared/remotes";
import { shared_slices } from "shared/store";
import { uiSlice } from "./ui/ui-slice";

export const clientStore = combineProducers({
	...shared_slices,
	notice: noticeSlice,
	ui: uiSlice,
});

export type ClientRootProducer = typeof clientStore;
export type ClientRootState = InferState<ClientRootProducer>;

const reciever = createBroadcastReceiver({
	start: () => {
		remotes.reflex_sync.start.fire();
	},
});

remotes.reflex_sync.dispatch.connect((actions) => {
	reciever.dispatch(actions);
});

clientStore.applyMiddleware(reciever.middleware);
