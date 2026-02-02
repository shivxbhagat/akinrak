import { Ionicons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlassBackButton, GlassButton } from "@/components/glass";
import { HeaderIcon, KeyboardAwareView } from "@/components/ui";
import { useAppTheme } from "@/lib/theme";

interface CodeVerificationProps {
	/** Email address to display in the subtitle */
	email: string;
	/** Main title text */
	title: string;
	/** Optional subtitle (defaults to "We sent a verification code to {email}") */
	subtitle?: string;
	/** Called when user submits the code - should throw on error */
	onVerify: (code: string) => Promise<void>;
	/** Called when user presses back button */
	onBack: () => void;
	/** Text for the verify button (defaults to "Verify") */
	buttonText?: string;
	/** Text for the back button (defaults to "Back") - no longer used, kept for compatibility */
	backButtonText?: string;
	/** Icon to display in header (defaults to shield-checkmark-outline for 2FA) */
	icon?: keyof typeof Ionicons.glyphMap;
}

export function CodeVerification({
	email,
	title,
	subtitle,
	onVerify,
	onBack,
	buttonText = "Verify",
	icon = "mail-outline",
}: CodeVerificationProps) {
	const { colors } = useAppTheme();

	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const hiddenInputRef = useRef<TextInput>(null);

	const handleCodeChange = (text: string) => {
		const digits = text.replace(/\D/g, "").slice(0, 6).split("");
		const newCode = [...digits];
		while (newCode.length < 6) {
			newCode.push("");
		}
		setCode(newCode);
	};

	const handleKeyPress = (e: any) => {
		if (e.nativeEvent.key === "Backspace") {
			const joined = code.join("");
			handleCodeChange(joined.slice(0, -1));
		}
	};

	const handleVerify = async () => {
		setLoading(true);
		setError("");

		try {
			await onVerify(code.join(""));
		} catch (err: any) {
			setError(
				err.errors?.[0]?.message ||
					err.message ||
					"Verification failed",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		setCode(["", "", "", "", "", ""]);
		setError("");
		onBack();
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
		>
			<Animated.View
				entering={FadeInDown.delay(50).duration(400)}
				style={styles.backButtonContainer}
			>
				<GlassBackButton onPress={handleBack} />
			</Animated.View>

			{/* used for unblocking area when the keyboard is open/active */}
			<KeyboardAwareView style={styles.keyboardView}>
				<View style={styles.content}>
					<Animated.View
						entering={FadeInDown.delay(100).duration(500)}
						style={styles.header}
					>
						<HeaderIcon
							icon={icon}
							backgroundColor="#008080"
							iconColor="#FFFFFF"
						/>
						<Text
							style={[
								styles.title,
								{ color: colors.onBackground },
							]}
						>
							{title}
						</Text>
						<Text
							style={[
								styles.subtitle,
								{ color: colors.onSurfaceVariant },
							]}
						>
							{subtitle ||
								`We sent a verification code to ${email}`}
						</Text>
					</Animated.View>

					<Animated.View
						entering={FadeInDown.delay(200).duration(500)}
						style={styles.form}
					>
						<View
							style={styles.codeInputContainer}
							onTouchStart={() => hiddenInputRef.current?.focus()}
						>
							<TextInput
								ref={hiddenInputRef}
								value={code.join("")}
								onChangeText={handleCodeChange}
								onKeyPress={handleKeyPress}
								keyboardType="number-pad"
								autoFocus
								maxLength={6}
								textContentType="oneTimeCode"
								style={styles.hiddenInput}
								caretHidden={true}
								selectionColor="#008080"
							/>
							{code.map((digit, index) => (
								<View
									key={index}
									style={[
										styles.codeInput,
										{
											borderColor: digit
												? "#008080"
												: "#E5E5E5",
											backgroundColor: "#FFFFFF",
										},
									]}
								>
									<Text
										style={[
											styles.codeDigit,
											{ color: colors.onBackground },
										]}
									>
										{digit}
									</Text>
								</View>
							))}
						</View>

						{error ? (
							<Animated.View
								entering={FadeInDown.duration(300)}
								style={styles.errorContainer}
							>
								<SymbolView
									name="exclamationmark.triangle.fill"
									size={16}
									tintColor="#DC2626"
								/>
								<Text selectable style={styles.errorText}>
									Verification code is incorrect
								</Text>
							</Animated.View>
						) : null}
					</Animated.View>
				</View>

				<Animated.View
					entering={FadeInUp.delay(300).duration(500)}
					style={styles.footer}
				>
					<GlassButton
						onPress={handleVerify}
						label={loading ? "Verifying..." : buttonText}
						disabled={loading || code.some((digit) => !digit)}
					/>
				</Animated.View>
			</KeyboardAwareView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backButtonContainer: {
		paddingLeft: 14,
		paddingRight: 24,
		paddingTop: 8,
	},
	keyboardView: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 24,
	},
	header: {
		marginBottom: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		marginBottom: 8,
		letterSpacing: -0.5,
	},
	subtitle: {
		fontSize: 17,
		lineHeight: 24,
	},
	form: {
		gap: 16,
	},
	codeInputContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
		position: "relative",
	},
	hiddenInput: {
		position: "absolute",
		left: -2,
		right: -2,
		height: 60,
		fontSize: 24,
		letterSpacing: 56,
		textAlign: "left",
		paddingLeft: 28,
		color: "transparent",
		backgroundColor: "transparent",
		zIndex: 1,
	},
	codeInput: {
		flex: 1,
		height: 60,
		borderWidth: 2,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	codeDigit: {
		fontSize: 24,
		fontWeight: "600",
	},
	errorContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "rgba(220,38,38,0.08)",
		padding: 14,
		borderRadius: 12,
		marginTop: -8,
	},
	errorText: {
		flex: 1,
		color: "#DC2626",
		fontSize: 14,
		lineHeight: 20,
	},
	footer: {
		padding: 24,
	},
});
