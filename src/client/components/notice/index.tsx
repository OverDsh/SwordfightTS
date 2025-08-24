import { useSelector } from "@rbxts/react-reflex";
import { selectNotices } from "client/store/notice/notice-selectors";
import { Notice } from "./notice";
import React from "@rbxts/react";

export function NoticesContainer() {
	const notices = useSelector(selectNotices);

	return (
		<>
			{notices.map((notice, index) => {
				return <Notice Notice={notice} Index={index} key={notice.id} />;
			})}
		</>
	);
}
