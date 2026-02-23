import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlassButton } from "@/components/glass";
import { useAppTheme } from "@/lib/theme";

const StartPage = () => {
	const { signOut } = useAuth();
	const { colors, isDark } = useAppTheme();

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
			edges={["top"]}
		>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.header}>
					<Text style={[styles.logo, { color: colors.onBackground }]}>
						NAME
					</Text>
				</View>

				<View style={styles.content}>
					<Text
						style={[styles.title, { color: colors.onBackground }]}
					>
						Welcome Home!
					</Text>
					<Text
						style={[
							styles.subtitle,
							{ color: colors.onBackground, opacity: 0.7 },
						]}
					>
						Your personalized experience starts here
					</Text>

					<GlassButton onPress={handleSignOut} label="Sign Out" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	header: {
		paddingHorizontal: 24,
		paddingTop: 16,
		paddingBottom: 8,
	},
	logo: {
		fontSize: 24,
		fontWeight: "900",
		letterSpacing: 4,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
		gap: 16,
		minHeight: 400,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		letterSpacing: -0.5,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
		marginBottom: 16,
	},
});

export default StartPage;
