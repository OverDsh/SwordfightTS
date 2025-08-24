import { ClientRootState } from "..";

export const selectCurrentPage = (state: ClientRootState) => {
	return state.ui.page;
};

export const selectCurrentTransaction = (state: ClientRootState) => {
	return state.ui.currentTransaction;
};
