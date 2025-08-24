import { NoticeType } from "client/store/notice/notice-slice";
import React, { useBinding, useEffect } from "@rbxts/react";
import { lerpBinding, useMotion } from "@rbxts/pretty-react-hooks";
import { useSelector, useSelectorCreator } from "@rbxts/react-reflex";
import { selectNoticeVisibleIndex } from "client/store/notice/notice-selectors";
import { dismissNotice } from "client/notices/notices-creator";

interface Props {
	Notice: NoticeType;
	Index: number;
}

const AlertHeight = 0.05;
const AlertWidth = 0.7;
const AlertPadding = 0.02;
const MaxAlertsOnScreen = 5;

export function Notice({ Notice, Index }: Props) {
	const [position, positionMotion] = useMotion(UDim2.fromScale(0.5, 1));
	const [animation, changeAnimationState] = useMotion(0);
	const visibleIndex = useSelectorCreator(selectNoticeVisibleIndex, Notice.id);

	useEffect(() => {
		const verticalPosition = 1 - (AlertHeight + AlertPadding) * (Index + 2);
		positionMotion.spring(UDim2.fromScale(0.5, verticalPosition), { tension: 250, friction: 30 });
	}, [Index]);

	useEffect(() => {
		if (visibleIndex >= MaxAlertsOnScreen) {
			dismissNotice(Notice.id);
		}
	}, [visibleIndex]);

	useEffect(() => {
		changeAnimationState.spring(Notice.visible ? 1 : 0, { tension: 400 });
	}, [Notice.visible]);

	return (
		<textlabel
			Size={lerpBinding(
				animation,
				UDim2.fromScale(AlertWidth / 1.5, AlertHeight / 1.5),
				UDim2.fromScale(AlertWidth, AlertHeight),
			)}
			Position={position}
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundTransparency={1}
			TextTransparency={lerpBinding(animation, 1, 0)}
			TextScaled={true}
			Text={Notice.message}
			Font={Enum.Font.GothamBold}
			RichText={true}
			TextColor3={new Color3(1, 1, 1)}
			TextStrokeTransparency={0}
		/>
	);
}
