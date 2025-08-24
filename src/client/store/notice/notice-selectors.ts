import { createSelector } from "@rbxts/reflex";
import { ClientRootState } from "..";
import { NoticeStateType } from "./notice-slice";

export const selectNotices = (state: ClientRootState) => {
	return state.notice.notices;
};

export const selectVisibleNotices = createSelector(selectNotices, (alerts) => {
	return alerts.filter((notice) => notice.visible);
});

export const selectNoticeVisibleIndex = (id: number) => {
	return createSelector(selectVisibleNotices, (notice) => {
		return notice.findIndex((notice) => notice.id === id);
	});
};
