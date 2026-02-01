import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartPage = () => {
	const { signOut } = useAuth();

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			console.error("Sign out error:", error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>StartPage</Text>

			<TouchableOpacity
				style={styles.signOutButton}
				onPress={handleSignOut}
			>
				<Text style={styles.signOutText}>Sign Out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 40,
	},
	signOutButton: {
		backgroundColor: "#008080",
		paddingHorizontal: 32,
		paddingVertical: 14,
		borderRadius: 20,
	},
	signOutText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default StartPage;
