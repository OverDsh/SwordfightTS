import { createProducer } from "@rbxts/reflex";

export interface NoticeType {
	readonly id: number;
	readonly visible: boolean;
	readonly message: string;
	readonly timeout: number;
}

export interface NoticeStateType {
	readonly notices: readonly NoticeType[];
}

const initState: NoticeStateType = {
	notices: [],
};

export const noticeSlice = createProducer(initState, {
	addNotice: (state, notice: NoticeType) => ({
		...state,
		notices: [notice, ...state.notices],
	}),

	removeNotice: (state, id: number) => ({
		...state,
		notices: state.notices.filter((notice) => notice.id !== id),
	}),

	setNoticeVisible: (state, id: number, visible: boolean) => ({
		...state,
		notices: state.notices.map((notice) => (notice.id === id ? { ...notice, visible: visible } : notice)),
	}),
});
