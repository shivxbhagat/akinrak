import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, StyleSheet, View } from "react-native";

import { hapticSelection } from "@/lib/haptics";
import { useAppTheme } from "@/lib/theme";

// Re-export for backward compatibility
export { getDefaultDateOfBirth } from "@/lib/dateUtils";

interface DateOfBirthPickerProps {
	value: Date;
	onChange: (date: Date) => void;
}

export function DateOfBirthPicker({ value, onChange }: DateOfBirthPickerProps) {
	const { colors } = useAppTheme();

	const handleChange = (_event: any, selectedDate?: Date) => {
		if (selectedDate) {
			hapticSelection();
			onChange(selectedDate);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.datePickerWrapper}>
				<DateTimePicker
					value={value}
					mode="date"
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={handleChange}
					themeVariant="light"
					style={styles.datePicker}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: 24,
	},
	ageCard: {
		paddingHorizontal: 48,
		paddingVertical: 24,
		borderRadius: 24,
		alignItems: "center",
	},
	ageNumber: {
		fontSize: 64,
		fontWeight: "800",
		letterSpacing: -2,
	},
	ageLabel: {
		fontSize: 18,
		fontWeight: "500",
		marginTop: -4,
	},
	datePickerWrapper: {
		alignItems: "center",
		width: "100%",
	},
	datePicker: {
		height: 180,
		width: "100%",
	},
});
