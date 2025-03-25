import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

const audioSource = require("../../assets/audio/risk.mp3");

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(audioSource);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          White Noise
        </ThemedText>

        <Pressable style={styles.playButton} onPress={() => player.play()}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color="#000000"
          />
        </Pressable>

        <ThemedText style={styles.statusText}>
          {isPlaying ? "Playing..." : "Tap to play"}
        </ThemedText>
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
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
  },
  playButton: {
    padding: 20,
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    opacity: 0.7,
  },
});
