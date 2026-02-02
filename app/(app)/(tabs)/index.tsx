import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlassButton } from "@/components/glass";
import { useAppTheme } from "@/lib/theme";

const StartPage = () => {
	const { signOut } = useAuth();
	const { colors } = useAppTheme();

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<View style={styles.content}>
				<Text style={[styles.title, { color: colors.onBackground }]}>
					Welcome Home!
				</Text>

				<GlassButton onPress={handleSignOut} label="Sign Out" />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
		gap: 32,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		letterSpacing: -0.5,
	},
});

export default StartPage;
