import { combineProducers, CombineStates, createBroadcaster, InferState } from "@rbxts/reflex";
import { dataSlice } from "./data/data-slice";
import { remotes } from "shared/remotes";

export const shared_slices = {
	data: dataSlice,
};

export type SharedRootState = CombineStates<typeof shared_slices>;
