import { forwardRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { useAppTheme } from "@/lib/theme";

type GlassInputProps = Omit<TextInputProps, "style">;

export const GlassInput = forwardRef<TextInput, GlassInputProps>(
	(props, ref) => {
		const { colors, isDark } = useAppTheme();
		const [isFocused, setIsFocused] = useState(false);

		const textColor = isDark ? "#FFFFFF" : "#1A1A1A";
		const placeholderColor = "#AAAAAA";

		return (
			<View
				style={{
					height: 56,
					borderRadius: 16,
					borderCurve: "continuous",
					backgroundColor: "#FFFFFF",
					justifyContent: "center",
					borderWidth: 2,
					borderColor: isFocused ? "#008080" : "#E5E5E5",
				}}
			>
				<TextInput
					ref={ref}
					style={{
						flex: 1,
						paddingHorizontal: 16,
						fontSize: 16,
						color: textColor,
					}}
					placeholderTextColor={placeholderColor}
					onFocus={(e) => {
						setIsFocused(true);
						props.onFocus?.(e);
					}}
					onBlur={(e) => {
						setIsFocused(false);
						props.onBlur?.(e);
					}}
					{...props}
				/>
			</View>
		);
	},
);

GlassInput.displayName = "GlassInput";
