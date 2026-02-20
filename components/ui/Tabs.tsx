import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Tab {
	id: string;
	label: string;
}

interface TabsProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
	return (
		<View style={styles.container}>
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id;

				return (
					<TouchableOpacity
						key={tab.id}
						onPress={() => onTabChange(tab.id)}
						style={[styles.tab, isActive && styles.activeTab]}
					>
						<Text
							style={[
								styles.tabText,
								isActive && styles.activeTabText,
							]}
						>
							{tab.label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		borderRadius: 12,
		padding: 4,
		gap: 4,
	},
	tab: {
		flex: 1,
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	activeTab: {
		backgroundColor: "#008080",
	},
	tabText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#666",
	},
	activeTabText: {
		color: "#FFFFFF",
	},
});
