import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ImageProps, StyleSheet, View } from "react-native";

interface ImageWithFallbackProps extends Omit<ImageProps, "source"> {
	src: string;
	alt?: string;
}

export function ImageWithFallback({
	src,
	alt,
	style,
	...props
}: ImageWithFallbackProps) {
	const [error, setError] = useState(false);

	if (error) {
		return (
			<View style={[styles.fallback, style]}>
				<Ionicons name="image-outline" size={48} color="#ccc" />
			</View>
		);
	}

	return (
		<Image
			source={{ uri: src }}
			style={style}
			onError={() => setError(true)}
			{...props}
		/>
	);
}

const styles = StyleSheet.create({
	fallback: {
		backgroundColor: "#f0f0f0",
		alignItems: "center",
		justifyContent: "center",
	},
});
