import { clientStore } from "client/store";
import { NoticeType } from "client/store/notice/notice-slice";

let nextId = 0;

const defaultNotice: NoticeType = {
	message: "Insert Message",
	timeout: 5,
	visible: true,
	id: 0,
};

export function dismissNotice(id: number) {
	clientStore.setNoticeVisible(id, false);
	Promise.delay(0.2).then(() => {
		clientStore.removeNotice(id);
	});
}

export function sendNotice(notice: Partial<NoticeType>) {
	const newNotice: NoticeType = {
		...defaultNotice,
		...notice,
		id: nextId++,
	};

	clientStore.addNotice(newNotice);
	Promise.delay(newNotice.timeout).then(() => {
		dismissNotice(newNotice.id);
	});
}
