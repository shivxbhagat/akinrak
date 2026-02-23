import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { useAppTheme } from "@/lib/theme";

export default function AppLayout() {
	const { user } = useUser();
	const { colors } = useAppTheme();

	//show a spinner while loading
	const hasProfile = true;

	return (
		<Stack screenOptions={{ headerShown: false }}>
			{/* Onboarding - only when NO profile exists */}
			<Stack.Protected guard={!hasProfile}>
				<Stack.Screen name="onboarding" />
			</Stack.Protected>

			{/* Main app - only when profile EXISTS */}
			<Stack.Protected guard={hasProfile}>
				<Stack.Screen name="(tabs)" />{" "}
				<Stack.Screen
					name="new-draft"
					options={{
						presentation: "modal",
						headerShown: false,
					}}
				/>{" "}
			</Stack.Protected>
		</Stack>
	);
}

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
