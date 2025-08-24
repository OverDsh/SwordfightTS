import React, { PropsWithChildren, useEffect } from "@rbxts/react";
import { Colors, Fonts } from "client/constants/theme";
import { StaticButton } from "client/components/ui/StaticButton";
import { lerpBinding, useMotion } from "@rbxts/pretty-react-hooks";
import { brighten } from "shared/utils/color-utils";
import { useSelector } from "@rbxts/react-reflex";
import { selectCurrentPage } from "client/store/ui/ui-selectors";
import { clientStore } from "client/store";
import { BlurScreen } from "client/utils/screen-blur";

interface Props extends PropsWithChildren {
	Name: string;
	page: string;
	Color: Color3;
	BackgroundColor?: Color3;
	BorderColor?: Color3;
	Size?: UDim2;
}

export function MenuWindow({
	Name,
	page,
	Color,
	BackgroundColor = Colors.Background,
	BorderColor,
	Size = UDim2.fromScale(1, 0.65),
	children,
}: Props) {
	const [hoveringCloseMotion, updateHoverClose] = useMotion(0);
	const currentPage = useSelector(selectCurrentPage);
	const [visibleTransition, visibleTransitionSpring] = useMotion(0);

	useEffect(() => {
		if (currentPage === page) {
			BlurScreen(24);
			visibleTransitionSpring.spring(1, { tension: 400 });
		} else {
			if (currentPage === "") {
				BlurScreen(0);
				visibleTransitionSpring.spring(0, { tension: 400 });
			} else {
				visibleTransitionSpring.immediate(0);
			}
		}
	}, [currentPage, page]);

	return (
		<canvasgroup
			Size={Size}
			Position={lerpBinding(visibleTransition, UDim2.fromScale(0.5, 0.55), UDim2.fromScale(0.5, 0.5))}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={BackgroundColor}
			Visible={currentPage === page ? true : false}
		>
			<uiaspectratioconstraint AspectRatio={1.36} />
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<frame
				Size={UDim2.fromScale(1, 0.15)}
				Position={UDim2.fromScale(0.5, 0)}
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundColor3={Color}
				BorderColor3={BorderColor}
				BorderSizePixel={BorderColor ? 1 : 0}
			>
				<textlabel
					Size={UDim2.fromScale(1, 0.6)}
					Position={UDim2.fromScale(0.5, 0.5)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					TextScaled={true}
					TextColor3={Colors.Text}
					Font={Fonts.Header}
					Text={Name}
				/>
				<StaticButton
					Size={UDim2.fromScale(1, 0.4)}
					Position={UDim2.fromScale(0.95, 0.5)}
					AnchorPoint={new Vector2(1, 0.5)}
					Transparency={1}
					onClick={() => clientStore.setPage("")}
					onHover={(hovering) => updateHoverClose.spring(hovering ? 1 : 0, { tension: 250, friction: 30 })}
				>
					<uiaspectratioconstraint AspectRatio={1} />
					<textlabel
						Size={UDim2.fromScale(1, 1)}
						Text={"X"}
						TextScaled={true}
						TextColor3={lerpBinding(hoveringCloseMotion, Colors.Text, brighten(Color, 0.3))}
						Font={Enum.Font.FredokaOne}
						BackgroundTransparency={1}
					/>
				</StaticButton>
			</frame>
			<canvasgroup
				Size={UDim2.fromScale(1, 0.85)}
				Position={UDim2.fromScale(0.5, 1)}
				AnchorPoint={new Vector2(0.5, 1)}
				BackgroundTransparency={1}
			>
				{children}
			</canvasgroup>
		</canvasgroup>
	);
}
