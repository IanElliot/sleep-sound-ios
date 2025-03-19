import {
  StyleSheet,
  Platform,
  Pressable,
  useColorScheme,
  Animated,
} from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Ionicons
            name="moon-outline"
            size={120}
            color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
          />
        </Animated.View>

        <ThemedText type="title" style={styles.title}>
          Sleep Sounds
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Relax and fall asleep naturally
        </ThemedText>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.startButtonPressed,
          ]}
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          <ThemedText style={styles.startButtonText}>Start Relaxing</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 32,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  startButtonPressed: {
    opacity: 0.8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
