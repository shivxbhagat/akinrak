import ItineraryDetailModal from "@/components/ItineraryDetailModal";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Tabs } from "@/components/ui/Tabs";
import { useAppTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Draft {
	id: string;
	location: string;
	destination: string;
	image: string;
	dateFrom: string;
	dateTo: string;
	isPaid: boolean;
	status: "AI drafting" | "Human Review" | "Ready";
	numberOfPeople: number;
}

const drafts: Draft[] = [
	{
		id: "1",
		location: "New York, USA",
		destination: "Paris, France",
		image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2OTkzMzgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
		dateFrom: "Mar 15, 2026",
		dateTo: "Mar 19, 2026",
		isPaid: true,
		status: "Ready",
		numberOfPeople: 2,
	},
	{
		id: "2",
		location: "San Francisco, USA",
		destination: "Tokyo, Japan",
		image: "https://images.unsplash.com/photo-1648871647634-0c99b483cb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc2OTkzMDI3NHww&ixlib=rb-4.1.0&q=80&w=1080",
		dateFrom: "Apr 10, 2026",
		dateTo: "Apr 20, 2026",
		isPaid: false,
		status: "Human Review",
		numberOfPeople: 4,
	},
];

export default function PlanScreen() {
	const { colors } = useAppTheme();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("all");
	const [showItinerary, setShowItinerary] = useState(false);

	const tabs = [
		{ id: "all", label: "All Trips" },
		{ id: "upcoming", label: "Upcoming" },
		{ id: "past", label: "Past" },
	];

	const handleNewDraft = () => {
		router.push("/");
	};

	const getStatusColors = (status: Draft["status"]) => {
		if (status === "AI drafting") {
			return { bg: "#DBEAFE", text: "#1E40AF" };
		}
		if (status === "Human Review") {
			return { bg: "#FEF3C7", text: "#92400E" };
		}
		return { bg: "#D1FAE5", text: "#065F46" };
	};

	const getStatusIcon = (status: Draft["status"]) => {
		if (status === "AI drafting") {
			return "sparkles";
		}
		if (status === "Human Review") {
			return "eye";
		}
		return "checkmark-circle";
	};

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background }]}
			edges={["top"]}
		>
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<View>
						<Text
							style={[
								styles.headerTitle,
								{ color: colors.onBackground },
							]}
						>
							My Drafts
						</Text>
						<Text style={styles.headerSubtitle}>
							Your travel itineraries
						</Text>
					</View>
					<TouchableOpacity
						style={styles.addButton}
						activeOpacity={0.8}
					>
						<Ionicons name="add" size={24} color="#FFFFFF" />
					</TouchableOpacity>
				</View>

				<View style={styles.tabsContainer}>
					<Tabs
						tabs={tabs}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
				</View>
			</View>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.draftsList}>
					{drafts.map((draft) => {
						const statusColors = getStatusColors(draft.status);
						const statusIcon = getStatusIcon(draft.status);
						const peopleText =
							draft.numberOfPeople === 1 ? "person" : "people";

						return (
							<TouchableOpacity
								key={draft.id}
								style={styles.draftCard}
								activeOpacity={0.7}
								onPress={() => {
									if (
										draft.destination
											.toLowerCase()
											.includes("paris")
									) {
										setShowItinerary(true);
									}
								}}
							>
								<View style={styles.imageContainer}>
									<ImageWithFallback
										src={draft.image}
										alt={draft.destination}
										style={styles.draftImage}
									/>
									<View style={styles.imageOverlay} />
									<View style={styles.imageContent}>
										<Text style={styles.destinationText}>
											{draft.destination}
										</Text>
										<Text style={styles.locationText}>
											From {draft.location}
										</Text>
									</View>
								</View>

								<View style={styles.cardContent}>
									<View style={styles.dateRow}>
										<Ionicons
											name="calendar-outline"
											size={16}
											color="#008080"
										/>
										<Text style={styles.dateText}>
											{draft.dateFrom} - {draft.dateTo}
										</Text>
									</View>

									<View style={styles.infoRow}>
										<View style={styles.peopleInfo}>
											<Ionicons
												name="people-outline"
												size={16}
												color="#008080"
											/>
											<Text style={styles.infoText}>
												{draft.numberOfPeople}{" "}
												{peopleText}
											</Text>
										</View>

										<View
											style={[
												styles.paymentBadge,
												{
													backgroundColor:
														draft.isPaid
															? "#D1FAE5"
															: "#FEE2E2",
												},
											]}
										>
											<Ionicons
												name="card-outline"
												size={12}
												color={
													draft.isPaid
														? "#065F46"
														: "#991B1B"
												}
											/>
											<Text
												style={[
													styles.paymentText,
													{
														color: draft.isPaid
															? "#065F46"
															: "#991B1B",
													},
												]}
											>
												{draft.isPaid
													? "Paid"
													: "Unpaid"}
											</Text>
										</View>
									</View>

									<View
										style={[
											styles.statusBadge,
											{
												backgroundColor:
													statusColors.bg,
											},
										]}
									>
										<Ionicons
											name={statusIcon as any}
											size={14}
											color={statusColors.text}
										/>
										<Text
											style={[
												styles.statusText,
												{ color: statusColors.text },
											]}
										>
											{draft.status}
										</Text>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>

			<ItineraryDetailModal
				visible={showItinerary}
				onClose={() => setShowItinerary(false)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 24,
		paddingTop: 16,
		paddingBottom: 16,
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 4,
	},
	headerSubtitle: {
		fontSize: 14,
		color: "#6B7280",
	},
	addButton: {
		width: 48,
		height: 48,
		backgroundColor: "#008080",
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 5,
	},
	tabsContainer: {
		alignItems: "center",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	draftsList: {
		paddingHorizontal: 24,
		gap: 16,
	},
	draftCard: {
		backgroundColor: "#FFFFFF",
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#F3F4F6",
		overflow: "hidden",
		marginBottom: 16,
	},
	imageContainer: {
		height: 160,
		position: "relative",
	},
	draftImage: {
		width: "100%",
		height: "100%",
	},
	imageOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	imageContent: {
		position: "absolute",
		bottom: 16,
		left: 16,
		right: 16,
	},
	destinationText: {
		fontSize: 20,
		fontWeight: "700",
		color: "#FFFFFF",
		marginBottom: 4,
	},
	locationText: {
		fontSize: 14,
		color: "rgba(255, 255, 255, 0.9)",
	},
	cardContent: {
		padding: 16,
		gap: 12,
	},
	dateRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	dateText: {
		fontSize: 14,
		color: "#4B5563",
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	peopleInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	infoText: {
		fontSize: 14,
		color: "#4B5563",
	},
	paymentBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 12,
	},
	paymentText: {
		fontSize: 12,
		fontWeight: "600",
	},
	statusBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 12,
		alignSelf: "flex-start",
	},
	statusText: {
		fontSize: 12,
		fontWeight: "500",
	},
});
