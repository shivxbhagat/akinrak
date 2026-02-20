import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Mountain } from "lucide-react-native";
import React from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

export default function WelcomeScreen() {
	const insets = useSafeAreaInsets();

	const handleGetStarted = () => {
		router.push("/(auth)/sign-in");
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{
					uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
				}}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				{/* Gradient Overlay */}
				<LinearGradient
					colors={[
						"rgba(0,0,0,0.3)",
						"rgba(0,0,0,0.2)",
						"rgba(0,0,0,0.6)",
					]}
					locations={[0, 0.5, 1]}
					style={styles.gradient}
				/>

				{/* Content */}
				<View
					style={[
						styles.content,
						{
							paddingTop: Math.max(insets.top, 96),
							paddingBottom: Math.max(insets.bottom, 48),
						},
					]}
				>
					{/* Logo and Brand */}
					<Animated.View
						entering={FadeInUp.delay(200).duration(800)}
						style={styles.brandContainer}
					>
						{/* Logo */}
						<View style={styles.logoContainer}>
							<View style={styles.logoBox}>
								<Mountain
									size={48}
									color="#FFFFFF"
									strokeWidth={2.5}
								/>
							</View>
							{/* Small accent circle */}
							<View style={styles.accentCircle} />
						</View>

						{/* Brand Name */}
						<Text style={styles.brandName}>name</Text>
						<Text style={styles.tagline}>
							Discover your perfect workspace, wherever you roam
						</Text>
					</Animated.View>

					{/* Get Started Button */}
					<View style={styles.buttonContainer}>
						<AnimatedTouchableOpacity
							entering={FadeInDown.delay(400).duration(800)}
							style={styles.button}
							onPress={handleGetStarted}
							activeOpacity={0.9}
						>
							<Text style={styles.buttonText}>Get Started</Text>
						</AnimatedTouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F9FAFB",
	},
	backgroundImage: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	gradient: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 32,
	},
	brandContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		paddingTop: 80,
	},
	logoContainer: {
		marginBottom: 24,
		position: "relative",
	},
	logoBox: {
		width: 96,
		height: 96,
		backgroundColor: "#008080",
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 15,
	},
	accentCircle: {
		position: "absolute",
		top: -8,
		right: -8,
		width: 32,
		height: 32,
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
	},
	brandName: {
		fontSize: 48,
		fontWeight: "700",
		color: "#FFFFFF",
		marginBottom: 12,
		letterSpacing: -1,
	},
	tagline: {
		fontSize: 18,
		color: "rgba(255, 255, 255, 0.9)",
		textAlign: "center",
		paddingHorizontal: 32,
		lineHeight: 24,
	},
	buttonContainer: {
		width: "100%",
		marginBottom: 8,
	},
	button: {
		width: "100%",
		backgroundColor: "#FFFFFF",
		paddingVertical: 16,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 10,
	},
	buttonText: {
		color: "#008080",
		fontSize: 16,
		fontWeight: "600",
		letterSpacing: 0.5,
	},
});
