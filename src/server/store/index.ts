import { combineProducers, createBroadcaster, InferState } from "@rbxts/reflex";
import { remotes } from "shared/remotes";
import { shared_slices } from "shared/store";
import { selectDataSlice } from "shared/store/data/data-selectors";
import { dataSlice } from "shared/store/data/data-slice";

export const serverStore = combineProducers({
	...shared_slices,
});

export type ServerRootProducer = typeof serverStore;
export type ServerRootState = InferState<ServerRootProducer>;

const broadcaster = createBroadcaster({
	producers: shared_slices,
	dispatch: (player, actions) => remotes.reflex_sync.dispatch.fire(player, actions),
	beforeDispatch: (player, action) => {
		if (action.name in dataSlice.getActions() && action.arguments[0] !== player) {
			return;
		}
		return action;
	},
	beforeHydrate: (player, state) => ({
		data: { [player.Name]: state.data[player.Name] }, //Streams only the data of the target player to reduct bandwith + hide other players info
	}),
});

remotes.reflex_sync.start.connect((player) => {
	broadcaster.start(player);
});

serverStore.applyMiddleware(broadcaster.middleware);
