import { number } from "@rbxts/react/src/prop-types";
import { createProducer } from "@rbxts/reflex";

interface Transaction {
	ID: number;
	Price: number;
	Name: string;
	Args: unknown[];
}

export interface uiStateType {
	page: string;
	currentTransaction: Transaction; //ID of the current comfirmation purchase
}

const initState: uiStateType = {
	page: "",
	currentTransaction: {
		ID: 0,
		Price: 0,
		Name: "",
		Args: [],
	},
};

export const uiSlice = createProducer(initState, {
	setPage: (state, newPage: string) => ({
		...state,
		page: newPage === state.page ? "" : newPage,
	}),
	setCurrentTransaction: (state, id: Transaction) => ({
		...state,
		currentTransaction: id,
	}),
});
