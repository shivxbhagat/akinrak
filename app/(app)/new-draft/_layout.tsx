import { useAppTheme } from "@/lib/theme";
import { Stack } from "expo-router";

export default function NewDraftLayout() {
	const { colors } = useAppTheme();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				presentation: "modal",
				animation: "slide_from_right",
			}}
		>
			<Stack.Screen name="locations" />
			<Stack.Screen name="dates" />
			<Stack.Screen name="travelers" />
			<Stack.Screen name="food" />
			<Stack.Screen name="description" />
			<Stack.Screen name="payment" />
		</Stack>
	);
}
