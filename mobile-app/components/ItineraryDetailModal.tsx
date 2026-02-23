import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Dimensions,
	Linking,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface ItineraryItem {
	time: string;
	duration: string;
	name: string;
	address: string;
	phone?: string;
	bookingRef?: string;
	type: "activity" | "food" | "hotel" | "transport" | "commute" | "flight";
	image?: string;
	reviewNote?: string;
	commuteMethod?: "walk" | "metro" | "taxi" | "uber" | "bus";
	commuteDistance?: string;
	flightNumber?: string;
	flightFrom?: string;
	flightTo?: string;
	gate?: string;
	seat?: string;
}

interface DaySchedule {
	day: number;
	date: string;
	items: ItineraryItem[];
}

const parisItinerary: DaySchedule[] = [
	{
		day: 1,
		date: "Mar 15",
		items: [
			{
				time: "05:30 AM",
				duration: "8h 30m",
				name: "Flight to Paris",
				address: "JFK Airport → Charles de Gaulle Airport",
				type: "flight",
				flightNumber: "AF 007",
				flightFrom: "New York JFK",
				flightTo: "Paris CDG",
				bookingRef: "AF-007-23K8L",
				gate: "Terminal 1, Gate 24",
				seat: "12A",
				reviewNote:
					"📝 Check-in opens 3 hours before departure. Lounge access included with Priority Pass.",
			},
			{
				time: "08:15 AM",
				duration: "45m",
				name: "Arrival & Hotel Transfer",
				address: "CDG Airport to Hotel Le Marais",
				type: "commute",
				commuteMethod: "taxi",
				commuteDistance: "25 km",
				reviewNote:
					"📝 Pre-booked taxi will be waiting at arrivals with your name sign.",
			},
			{
				time: "09:00 AM",
				duration: "3h",
				name: "Eiffel Tower",
				address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris",
				phone: "+33 892 70 12 39",
				bookingRef: "ETW-2024-5892",
				type: "activity",
				image: "https://images.unsplash.com/photo-1645178200002-175654492459?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzJTIwdmlld3xlbnwxfHx8fDE3NzAwNzQ2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Arrive early to avoid crowds. Summit access is worth it for the views!",
			},
			{
				time: "12:15 PM",
				duration: "15m",
				name: "To Lunch",
				address: "Eiffel Tower → Café de l'Homme",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "1.2 km",
			},
			{
				time: "12:30 PM",
				duration: "1.5h",
				name: "Lunch at Café de l'Homme",
				address: "17 Pl. du Trocadéro et du 11 Novembre, 75116 Paris",
				phone: "+33 1 44 05 30 15",
				bookingRef: "RES-CDH-8934",
				type: "food",
				reviewNote:
					"📝 Request a table with Eiffel Tower view. Try the duck confit!",
			},
			{
				time: "02:15 PM",
				duration: "15m",
				name: "To Louvre",
				address: "Trocadéro → Louvre Museum",
				type: "commute",
				commuteMethod: "metro",
				commuteDistance: "Line 9 → Line 1",
			},
			{
				time: "02:30 PM",
				duration: "2h",
				name: "Louvre Museum",
				address: "Rue de Rivoli, 75001 Paris",
				phone: "+33 1 40 20 50 50",
				bookingRef: "LVR-45782",
				type: "activity",
				image: "https://images.unsplash.com/photo-1635666626028-5e319a2592b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3V2cmUlMjBtdXNldW0lMjBwYXJpc3xlbnwxfHx8fDE3NzAwMzIzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Focus on highlights: Mona Lisa, Venus de Milo. Use the Carousel entrance to skip lines.",
			},
			{
				time: "05:45 PM",
				duration: "15m",
				name: "To River Cruise",
				address: "Louvre → Port de la Bourdonnais",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "2.1 km",
			},
			{
				time: "06:00 PM",
				duration: "2h",
				name: "Seine River Cruise",
				address: "Port de la Bourdonnais, 75007 Paris",
				phone: "+33 1 42 25 96 10",
				bookingRef: "SRC-9845",
				type: "activity",
				image: "https://images.unsplash.com/photo-1723984727287-181003bdc4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWluZSUyMHJpdmVyJTIwcGFyaXMlMjBib2F0fGVufDF8fHx8MTc3MDA3NDY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Sunset cruise is magical. Bring a light jacket - it gets breezy!",
			},
			{
				time: "08:15 PM",
				duration: "15m",
				name: "To Dinner",
				address: "Cruise Dock → Le Jules Verne",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "850 m",
			},
			{
				time: "08:30 PM",
				duration: "2h",
				name: "Dinner at Le Jules Verne",
				address: "Eiffel Tower, 2nd floor, 75007 Paris",
				phone: "+33 1 45 55 61 44",
				bookingRef: "JV-DINNER-3421",
				type: "food",
				reviewNote:
					"📝 Michelin-star experience. Dress code: smart casual. Amazing views!",
			},
		],
	},
	{
		day: 2,
		date: "Mar 16",
		items: [
			{
				time: "08:15 AM",
				duration: "15m",
				name: "To Breakfast",
				address: "Hotel → Angelina",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "650 m",
			},
			{
				time: "08:30 AM",
				duration: "1h",
				name: "Breakfast at Angelina",
				address: "226 Rue de Rivoli, 75001 Paris",
				phone: "+33 1 42 60 82 00",
				type: "food",
				reviewNote:
					"📝 Must try: African hot chocolate and Mont-Blanc pastry!",
			},
			{
				time: "09:45 AM",
				duration: "15m",
				name: "To Notre-Dame",
				address: "Angelina → Notre-Dame",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "1.8 km",
			},
			{
				time: "10:00 AM",
				duration: "2.5h",
				name: "Notre-Dame & Sainte-Chapelle",
				address: "6 Parvis Notre-Dame, 75004 Paris",
				phone: "+33 1 42 34 56 10",
				bookingRef: "NDM-7234",
				type: "activity",
				image: "https://images.unsplash.com/photo-1712105128884-88955752e1f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3RyZSUyMGRhbWUlMjBjYXRoZWRyYWwlMjBwYXJpc3xlbnwxfHx8fDE3NzAwNzQ2NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Visit Sainte-Chapelle first for the stunning stained glass. Currently under restoration.",
			},
			{
				time: "01:00 PM",
				duration: "1.5h",
				name: "Latin Quarter Walking Tour",
				address: "Place Saint-Michel, 75005 Paris",
				bookingRef: "LQT-8934",
				type: "activity",
				reviewNote:
					"📝 Guide Jean-Paul is fantastic! Explore Shakespeare & Company bookshop.",
			},
			{
				time: "02:45 PM",
				duration: "5m",
				name: "To Lunch",
				address: "Within Latin Quarter",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "400 m",
			},
			{
				time: "03:00 PM",
				duration: "1h",
				name: "Lunch at Le Procope",
				address: "13 Rue de l'Ancienne Comédie, 75006 Paris",
				phone: "+33 1 40 46 79 00",
				type: "food",
				reviewNote:
					"📝 Paris's oldest café (1686). Rich history - perfect for light lunch.",
			},
			{
				time: "04:15 PM",
				duration: "20m",
				name: "To Musée d'Orsay",
				address: "Le Procope → Musée d'Orsay",
				type: "commute",
				commuteMethod: "bus",
				commuteDistance: "Bus 87",
			},
			{
				time: "05:00 PM",
				duration: "2h",
				name: "Musée d'Orsay",
				address: "1 Rue de la Légion d'Honneur, 75007 Paris",
				phone: "+33 1 40 49 48 14",
				bookingRef: "MO-5621",
				type: "activity",
				reviewNote:
					"📝 Best impressionist collection in the world. Don't miss the 5th floor!",
			},
		],
	},
	{
		day: 3,
		date: "Mar 17",
		items: [
			{
				time: "08:30 AM",
				duration: "30m",
				name: "To Versailles",
				address: "Hotel → Versailles Château",
				type: "commute",
				commuteMethod: "uber",
				commuteDistance: "20 km",
			},
			{
				time: "09:00 AM",
				duration: "4h",
				name: "Versailles Palace & Gardens",
				address: "Place d'Armes, 78000 Versailles",
				phone: "+33 1 30 83 78 00",
				bookingRef: "VER-PALACE-4521",
				type: "activity",
				image: "https://images.unsplash.com/photo-1699076702839-8133c8bf8fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJzYWlsbGVzJTIwcGFsYWNlJTIwZ2FyZGVuc3xlbnwxfHx8fDE3NzAwNjE4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Skip-the-line tickets included. Wear comfortable shoes - lots of walking! Hall of Mirrors is breathtaking.",
			},
			{
				time: "01:00 PM",
				duration: "10m",
				name: "To Lunch",
				address: "Within Palace Grounds",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "500 m",
			},
			{
				time: "01:30 PM",
				duration: "1.5h",
				name: "Lunch at Ore Ducasse",
				address: "Château de Versailles, 78000 Versailles",
				phone: "+33 1 30 84 12 96",
				bookingRef: "ORE-2341",
				type: "food",
				reviewNote:
					"📝 Alain Ducasse restaurant. Contemporary French cuisine in pavilion setting.",
			},
			{
				time: "03:30 PM",
				duration: "30m",
				name: "Return to Paris",
				address: "Versailles → Paris",
				type: "commute",
				commuteMethod: "uber",
				commuteDistance: "RER C alternative",
			},
			{
				time: "05:30 PM",
				duration: "30m",
				name: "To Montmartre",
				address: "Hotel → Sacré-Cœur",
				type: "commute",
				commuteMethod: "metro",
				commuteDistance: "Line 4 → Line 12",
			},
			{
				time: "06:00 PM",
				duration: "2h",
				name: "Montmartre & Sacré-Cœur",
				address: "35 Rue du Chevalier de la Barre, 75018 Paris",
				phone: "+33 1 53 41 89 00",
				type: "activity",
				image: "https://images.unsplash.com/photo-1636619299986-9463f8f4d8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb250bWFydHJlJTIwcGFyaXMlMjBzYWNyZSUyMGNvZXVyfGVufDF8fHx8MTc3MDA3NDY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Sunset from the steps is incredible. Watch street artists at Place du Tertre.",
			},
			{
				time: "08:15 PM",
				duration: "5m",
				name: "To Dinner",
				address: "Sacré-Cœur → La Maison Rose",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "350 m",
			},
			{
				time: "08:30 PM",
				duration: "2h",
				name: "Dinner at La Maison Rose",
				address: "2 Rue de l'Abreuvoir, 75018 Paris",
				phone: "+33 1 42 57 66 75",
				type: "food",
				reviewNote:
					"📝 Iconic pink cottage. Traditional French bistro - very romantic!",
			},
		],
	},
	{
		day: 4,
		date: "Mar 18",
		items: [
			{
				time: "09:45 AM",
				duration: "15m",
				name: "To Arc de Triomphe",
				address: "Hotel → Arc de Triomphe",
				type: "commute",
				commuteMethod: "metro",
				commuteDistance: "Line 1",
			},
			{
				time: "10:00 AM",
				duration: "3h",
				name: "Arc de Triomphe & Champs-Élysées",
				address: "Place Charles de Gaulle, 75008 Paris",
				phone: "+33 1 55 37 73 77",
				bookingRef: "ARC-6782",
				type: "activity",
				image: "https://images.unsplash.com/photo-1569949384963-296c0f251fbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmMlMjBkZSUyMHRyaW9tcGhlJTIwcGFyaXN8ZW58MXx8fHwxNzcwMDc0NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Climb to the top for panoramic views. Shop along Champs-Élysées afterwards.",
			},
			{
				time: "01:15 PM",
				duration: "15m",
				name: "To Lunch",
				address: "Walk down Champs-Élysées",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "800 m",
			},
			{
				time: "01:30 PM",
				duration: "1.5h",
				name: "Lunch at Ladurée",
				address: "75 Av. des Champs-Élysées, 75008 Paris",
				phone: "+33 1 40 75 08 75",
				type: "food",
				reviewNote:
					"📝 Famous for macarons! Try the rose or pistachio flavors. Beautiful interior.",
			},
			{
				time: "03:15 PM",
				duration: "15m",
				name: "To Le Marais",
				address: "Champs-Élysées → Le Marais",
				type: "commute",
				commuteMethod: "metro",
				commuteDistance: "Line 1",
			},
			{
				time: "03:30 PM",
				duration: "2h",
				name: "Le Marais District",
				address: "Le Marais, 75004 Paris",
				type: "activity",
				reviewNote:
					"📝 Trendy neighborhood. Visit Place des Vosges and Jewish quarter. Great boutiques!",
			},
			{
				time: "05:45 PM",
				duration: "15m",
				name: "To Galeries Lafayette",
				address: "Le Marais → Galeries Lafayette",
				type: "commute",
				commuteMethod: "metro",
				commuteDistance: "Line 8 → Line 9",
			},
			{
				time: "06:00 PM",
				duration: "1.5h",
				name: "Shopping at Galeries Lafayette",
				address: "40 Bd Haussmann, 75009 Paris",
				phone: "+33 1 42 82 34 56",
				type: "activity",
				reviewNote:
					"📝 Stunning Art Nouveau architecture. Free rooftop terrace with city views!",
			},
			{
				time: "07:45 PM",
				duration: "15m",
				name: "To Dinner",
				address: "Galeries Lafayette → L'Avant Comptoir",
				type: "commute",
				commuteMethod: "taxi",
				commuteDistance: "3 km",
			},
			{
				time: "08:00 PM",
				duration: "2h",
				name: "Dinner at L'Avant Comptoir",
				address: "3 Carrefour de l'Odéon, 75006 Paris",
				phone: "+33 1 44 27 07 97",
				type: "food",
				reviewNote:
					"📝 Standing-room tapas bar. Casual but exceptional. Try everything!",
			},
		],
	},
	{
		day: 5,
		date: "Mar 19",
		items: [
			{
				time: "08:45 AM",
				duration: "15m",
				name: "To Luxembourg Gardens",
				address: "Hotel → Luxembourg Gardens",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "1.1 km",
			},
			{
				time: "09:00 AM",
				duration: "2h",
				name: "Luxembourg Gardens",
				address: "75006 Paris",
				type: "activity",
				image: "https://images.unsplash.com/photo-1596772316471-039ea1eb94f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXhlbWJvdXJnJTIwZ2FyZGVucyUyMHBhcmlzfGVufDF8fHx8MTc3MDA3NDY1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
				reviewNote:
					"📝 Perfect morning stroll. Relax by the pond or rent a toy sailboat!",
			},
			{
				time: "11:15 AM",
				duration: "10m",
				name: "To Brunch",
				address: "Luxembourg Gardens → Café de Flore",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "550 m",
			},
			{
				time: "11:30 AM",
				duration: "1h",
				name: "Brunch at Café de Flore",
				address: "172 Bd Saint-Germain, 75006 Paris",
				phone: "+33 1 45 48 55 26",
				type: "food",
				reviewNote:
					"📝 Historic café frequented by Sartre & Simone de Beauvoir. Perfect farewell meal!",
			},
			{
				time: "12:45 PM",
				duration: "15m",
				name: "To Rue Cler",
				address: "Café de Flore → Rue Cler Market",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "2.3 km",
			},
			{
				time: "01:00 PM",
				duration: "2h",
				name: "Last Minute Souvenir Shopping",
				address: "Rue Cler Market, 75007 Paris",
				type: "activity",
				reviewNote:
					"📝 Authentic Parisian market street. Pick up wine, cheese, and gifts!",
			},
			{
				time: "03:15 PM",
				duration: "15m",
				name: "Return to Hotel",
				address: "Rue Cler → Hotel",
				type: "commute",
				commuteMethod: "walk",
				commuteDistance: "1.5 km",
			},
			{
				time: "03:30 PM",
				duration: "1h",
				name: "Hotel Checkout",
				address: "Check out by 3:00 PM",
				type: "hotel",
				reviewNote: "📝 Luggage storage available until departure.",
			},
			{
				time: "04:45 PM",
				duration: "45m",
				name: "Airport Transfer",
				address: "Hotel → Charles de Gaulle Airport",
				type: "commute",
				commuteMethod: "taxi",
				commuteDistance: "25 km",
				bookingRef: "TAXI-CDG-9823",
				reviewNote:
					"📝 Pre-booked private transfer. Driver will meet you at hotel lobby.",
			},
			{
				time: "07:15 PM",
				duration: "8h 45m",
				name: "Flight Home",
				address: "Charles de Gaulle Airport → JFK Airport",
				type: "flight",
				flightNumber: "AF 008",
				flightFrom: "Paris CDG",
				flightTo: "New York JFK",
				bookingRef: "AF-008-23K8L",
				gate: "Terminal 2E, Gate K42",
				seat: "12A",
				reviewNote:
					"📝 Check-in 3 hours early. Enjoy the Air France lounge! Safe travels!",
			},
		],
	},
];

interface ItineraryDetailModalProps {
	visible: boolean;
	onClose?: () => void;
}

export default function ItineraryDetailModal({
	visible,
	onClose,
}: ItineraryDetailModalProps) {
	const [selectedDay, setSelectedDay] = useState(1);

	const getTypeColor = (type: ItineraryItem["type"]) => {
		switch (type) {
			case "activity":
				return "#008080";
			case "food":
				return "#f97316";
			case "hotel":
				return "#a855f7";
			case "transport":
				return "#3b82f6";
			case "commute":
				return "#9ca3af";
			case "flight":
				return "#6366f1";
		}
	};

	const getTypeIcon = (type: ItineraryItem["type"]) => {
		switch (type) {
			case "activity":
				return "compass";
			case "food":
				return "restaurant";
			case "hotel":
				return "bed";
			case "transport":
				return "car";
			case "commute":
				return "arrow-forward";
			case "flight":
				return "airplane";
		}
	};

	const getCommuteIcon = (method?: string) => {
		switch (method) {
			case "walk":
				return "walk";
			case "metro":
				return "subway";
			case "taxi":
				return "car";
			case "uber":
				return "car-sport";
			case "bus":
				return "bus";
			default:
				return "arrow-forward";
		}
	};

	const handleGetDirections = (address: string) => {
		const encodedAddress = encodeURIComponent(address);
		Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
	};

	const handleCallPhone = (phone: string) => {
		Linking.openURL(`tel:${phone}`);
	};

	const currentDay = parisItinerary.find((d) => d.day === selectedDay);

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<SafeAreaView style={styles.container} edges={["top"]}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerTop}>
						<View>
							<Text style={styles.title}>Paris Itinerary</Text>
							<Text style={styles.subtitle}>
								Mar 15 - Mar 19, 2026
							</Text>
						</View>
						<TouchableOpacity
							onPress={onClose}
							style={styles.closeButton}
							activeOpacity={0.7}
						>
							<Ionicons name="close" size={20} color="#000" />
						</TouchableOpacity>
					</View>

					{/* Day Selector */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.daySelector}
						contentContainerStyle={styles.daySelectorContent}
					>
						{parisItinerary.map((day) => (
							<TouchableOpacity
								key={day.day}
								onPress={() => setSelectedDay(day.day)}
								style={[
									styles.dayButton,
									selectedDay === day.day &&
										styles.dayButtonActive,
								]}
								activeOpacity={0.7}
							>
								<Text
									style={[
										styles.dayButtonLabel,
										selectedDay === day.day &&
											styles.dayButtonLabelActive,
									]}
								>
									Day {day.day}
								</Text>
								<Text
									style={[
										styles.dayButtonDate,
										selectedDay === day.day &&
											styles.dayButtonDateActive,
									]}
								>
									{day.date}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Itinerary Content */}
				<ScrollView
					style={styles.content}
					showsVerticalScrollIndicator={false}
				>
					{currentDay && (
						<View style={styles.timeline}>
							{currentDay.items.map((item, index) => (
								<View key={index} style={styles.timelineItem}>
									{/* Timeline Left */}
									<View style={styles.timelineLeft}>
										<Text style={styles.timeText}>
											{item.time}
										</Text>

										{/* Dot and Line */}
										<View style={styles.timelineDotWrapper}>
											<View
												style={[
													styles.timelineDot,
													{
														backgroundColor:
															getTypeColor(
																item.type,
															),
														width:
															item.type ===
															"commute"
																? 32
																: 40,
														height:
															item.type ===
															"commute"
																? 32
																: 40,
													},
												]}
											>
												<Ionicons
													name={
														item.type === "commute"
															? (getCommuteIcon(
																	item.commuteMethod,
															  ) as any)
															: (getTypeIcon(
																	item.type,
															  ) as any)
													}
													size={
														item.type === "commute"
															? 16
															: 20
													}
													color="#fff"
												/>
											</View>
											{index <
												currentDay.items.length - 1 &&
												item.type !== "commute" && (
													<View
														style={[
															styles.timelineLine,
															{
																backgroundColor:
																	"#e5e7eb",
															},
														]}
													/>
												)}
										</View>
									</View>

									{/* Content */}
									{item.type === "commute" ? (
										// Simplified Commute UI
										<View style={styles.commuteContent}>
											<Text style={styles.commuteName}>
												{item.name}
											</Text>
											<View style={styles.commuteInfo}>
												<Text
													style={styles.commuteMeta}
												>
													{item.duration}
													{item.commuteDistance &&
														` • ${item.commuteDistance}`}
												</Text>
											</View>
										</View>
									) : item.type === "flight" ? (
										// Flight UI
										<View style={styles.flightCard}>
											<View style={styles.cardContent}>
												<View
													style={styles.flightHeader}
												>
													<View
														style={
															styles.flightHeaderLeft
														}
													>
														<Ionicons
															name="airplane"
															size={20}
															color="#6366f1"
														/>
														<View>
															<Text
																style={
																	styles.cardTitle
																}
															>
																{item.name}
															</Text>
															<Text
																style={
																	styles.flightNumber
																}
															>
																{
																	item.flightNumber
																}
															</Text>
														</View>
													</View>
													<View
														style={
															styles.durationBadge
														}
													>
														<Text
															style={
																styles.durationText
															}
														>
															{item.duration}
														</Text>
													</View>
												</View>

												<View
													style={styles.flightDetails}
												>
													<View
														style={
															styles.flightDetailRow
														}
													>
														<Text
															style={
																styles.flightLabel
															}
														>
															From:
														</Text>
														<Text
															style={
																styles.flightValue
															}
														>
															{item.flightFrom}
														</Text>
													</View>
													<View
														style={
															styles.flightDetailRow
														}
													>
														<Text
															style={
																styles.flightLabel
															}
														>
															To:
														</Text>
														<Text
															style={
																styles.flightValue
															}
														>
															{item.flightTo}
														</Text>
													</View>
													<View
														style={
															styles.flightMetaRow
														}
													>
														<Text
															style={
																styles.flightMeta
															}
														>
															Gate: {item.gate}
														</Text>
														<Text
															style={
																styles.flightMeta
															}
														>
															Seat: {item.seat}
														</Text>
													</View>
												</View>

												{item.bookingRef && (
													<View
														style={
															styles.bookingRef
														}
													>
														<Ionicons
															name="checkmark-circle"
															size={14}
															color="#16a34a"
														/>
														<Text
															style={
																styles.bookingRefLabel
															}
														>
															Confirmation:{" "}
															<Text
																style={
																	styles.bookingRefValue
																}
															>
																{
																	item.bookingRef
																}
															</Text>
														</Text>
													</View>
												)}

												{item.reviewNote && (
													<View
														style={
															styles.reviewNote
														}
													>
														<Ionicons
															name="chatbox-outline"
															size={14}
															color="#6366f1"
														/>
														<Text
															style={
																styles.reviewNoteText
															}
														>
															{item.reviewNote}
														</Text>
													</View>
												)}
											</View>
										</View>
									) : (
										// Regular Activity/Food/Hotel UI
										<View style={styles.regularCard}>
											{/* Image if available */}
											{item.image && (
												<View
													style={
														styles.imageContainer
													}
												>
													<ImageWithFallback
														src={item.image}
														alt={item.name}
														style={styles.image}
													/>
													<View
														style={
															styles.imageOverlay
														}
													/>
												</View>
											)}

											<View style={styles.cardContent}>
												<View style={styles.cardHeader}>
													<Text
														style={styles.cardTitle}
														numberOfLines={2}
													>
														{item.name}
													</Text>
													<View
														style={
															styles.durationBadge
														}
													>
														<Text
															style={
																styles.durationText
															}
														>
															{item.duration}
														</Text>
													</View>
												</View>

												<View style={styles.details}>
													{/* Address */}
													<View
														style={styles.detailRow}
													>
														<Ionicons
															name="location-outline"
															size={14}
															color="#008080"
															style={
																styles.detailIcon
															}
														/>
														<Text
															style={
																styles.detailText
															}
														>
															{item.address}
														</Text>
													</View>

													{/* Phone */}
													{item.phone && (
														<TouchableOpacity
															onPress={() =>
																handleCallPhone(
																	item.phone!,
																)
															}
															style={
																styles.detailRow
															}
															activeOpacity={0.7}
														>
															<Ionicons
																name="call-outline"
																size={14}
																color="#008080"
																style={
																	styles.detailIcon
																}
															/>
															<Text
																style={[
																	styles.detailText,
																	styles.linkText,
																]}
															>
																{item.phone}
															</Text>
														</TouchableOpacity>
													)}

													{/* Booking Reference */}
													{item.bookingRef && (
														<View
															style={
																styles.bookingRef
															}
														>
															<Ionicons
																name="checkmark-circle"
																size={14}
																color="#16a34a"
															/>
															<Text
																style={
																	styles.bookingRefLabel
																}
															>
																Booking:{" "}
																<Text
																	style={
																		styles.bookingRefValue
																	}
																>
																	{
																		item.bookingRef
																	}
																</Text>
															</Text>
														</View>
													)}

													{/* Review Note */}
													{item.reviewNote && (
														<View
															style={
																styles.reviewNote
															}
														>
															<Ionicons
																name="chatbox-outline"
																size={14}
																color="#008080"
																style={
																	styles.detailIcon
																}
															/>
															<Text
																style={
																	styles.reviewNoteText
																}
															>
																{
																	item.reviewNote
																}
															</Text>
														</View>
													)}

													{/* Get Directions */}
													{item.type !== "hotel" && (
														<TouchableOpacity
															onPress={() =>
																handleGetDirections(
																	item.address,
																)
															}
															style={
																styles.directionsButton
															}
															activeOpacity={0.7}
														>
															<Ionicons
																name="navigate-outline"
																size={12}
																color="#008080"
															/>
															<Text
																style={
																	styles.directionsText
																}
															>
																Get Directions
															</Text>
														</TouchableOpacity>
													)}
												</View>
											</View>
										</View>
									)}
								</View>
							))}
						</View>
					)}
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f3f4f6",
	},
	headerTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: "#6b7280",
	},
	closeButton: {
		width: 40,
		height: 40,
		backgroundColor: "#f3f4f6",
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	daySelector: {
		marginTop: 8,
	},
	daySelectorContent: {
		gap: 8,
		paddingBottom: 8,
	},
	dayButton: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 16,
		backgroundColor: "#f9fafb",
		minWidth: 80,
	},
	dayButtonActive: {
		backgroundColor: "#008080",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 4,
	},
	dayButtonLabel: {
		fontSize: 12,
		color: "#6b7280",
		marginBottom: 2,
	},
	dayButtonLabelActive: {
		color: "rgba(255, 255, 255, 0.8)",
	},
	dayButtonDate: {
		fontSize: 14,
		fontWeight: "600",
		color: "#374151",
	},
	dayButtonDateActive: {
		color: "#fff",
	},
	content: {
		flex: 1,
	},
	timeline: {
		padding: 24,
	},
	timelineItem: {
		flexDirection: "row",
		gap: 16,
		marginBottom: 32,
	},
	timelineLeft: {
		alignItems: "center",
		flexShrink: 0,
	},
	timeText: {
		fontSize: 12,
		color: "#6b7280",
		fontWeight: "500",
		marginBottom: 8,
		width: 64,
		textAlign: "right",
	},
	timelineDotWrapper: {
		flexDirection: "column",
		alignItems: "center",
		position: "relative",
	},
	timelineDot: {
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
		zIndex: 10,
	},
	timelineLine: {
		width: 2,
		position: "absolute",
		top: 40,
		bottom: -32,
	},
	commuteContent: {
		flex: 1,
		paddingVertical: 8,
	},
	commuteInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	commuteName: {
		fontSize: 14,
		fontWeight: "500",
		color: "#4b5563",
	},
	commuteMeta: {
		fontSize: 12,
		color: "#9ca3af",
	},
	flightCard: {
		flex: 1,
		backgroundColor: "#eef2ff",
		borderRadius: 16,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#c7d2fe",
	},
	regularCard: {
		flex: 1,
		backgroundColor: "#f9fafb",
		borderRadius: 16,
		overflow: "hidden",
	},
	imageContainer: {
		height: 128,
		width: "100%",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageOverlay: {
		position: "absolute",
		inset: 0,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	cardContent: {
		padding: 16,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 12,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "600",
		flex: 1,
		paddingRight: 8,
	},
	durationBadge: {
		backgroundColor: "#fff",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	durationText: {
		fontSize: 12,
		color: "#6b7280",
	},
	flightHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 12,
	},
	flightHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		flex: 1,
	},
	flightNumber: {
		fontSize: 12,
		color: "#6b7280",
	},
	flightDetails: {
		gap: 8,
		marginBottom: 12,
	},
	flightDetailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	flightLabel: {
		fontSize: 14,
		color: "#6b7280",
	},
	flightValue: {
		fontSize: 14,
		fontWeight: "600",
	},
	flightMetaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	flightMeta: {
		fontSize: 12,
		color: "#6b7280",
	},
	details: {
		gap: 8,
	},
	detailRow: {
		flexDirection: "row",
		gap: 8,
	},
	detailIcon: {
		marginTop: 2,
	},
	detailText: {
		fontSize: 12,
		color: "#4b5563",
		flex: 1,
		lineHeight: 18,
	},
	linkText: {
		color: "#008080",
	},
	bookingRef: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#e5e7eb",
	},
	bookingRefLabel: {
		fontSize: 12,
		color: "#6b7280",
	},
	bookingRefValue: {
		fontWeight: "600",
		color: "#374151",
	},
	reviewNote: {
		flexDirection: "row",
		gap: 8,
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#e5e7eb",
	},
	reviewNoteText: {
		fontSize: 12,
		color: "#374151",
		flex: 1,
		lineHeight: 18,
		fontStyle: "italic",
	},
	directionsButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 8,
	},
	directionsText: {
		fontSize: 12,
		color: "#008080",
		textDecorationLine: "underline",
	},
});
