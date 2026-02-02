import { Stack } from "expo-router";

import { useAppTheme } from "@/lib/theme";

export default function AuthLayout() {
	const { colors } = useAppTheme();

	console.log("I am at Auth");

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: colors.background },
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="welcome" />
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="sign-up" />
		</Stack>
	);
}
