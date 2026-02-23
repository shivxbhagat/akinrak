import { useAppTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
	const { colors, isDark } = useAppTheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					position: "absolute",
					backgroundColor: isDark
						? "rgba(0, 0, 0, 0.9)"
						: "rgba(255, 255, 255, 0.9)",
					borderTopWidth: 0,
					elevation: 0,
					height: Platform.OS === "ios" ? 85 : 65,
					paddingBottom: Platform.OS === "ios" ? 25 : 10,
					paddingTop: 10,
				},
				tabBarActiveTintColor: "#008080",
				tabBarInactiveTintColor: isDark
					? "rgba(255, 255, 255, 0.5)"
					: "rgba(0, 0, 0, 0.5)",
				tabBarLabelStyle: {
					fontSize: 10,
					fontWeight: "600",
					marginTop: 4,
				},
				tabBarIconStyle: {
					marginTop: 5,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="plan"
				options={{
					title: "Plan",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "sparkles" : "sparkles-outline"}
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
