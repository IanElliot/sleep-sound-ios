import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";

const audioSource = require("./assets/Hello.mp3");

// Custom hook for audio handling
function useAudio(audioSource: number) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function setupAudio() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(audioSource, {
          isLooping: true,
          shouldPlay: false,
        });

        setSound(sound);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    }

    setupAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioSource]);

  const playSound = async () => {
    if (!sound) return;
    try {
      await sound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    if (!sound) return;
    try {
      await sound.pauseAsync();
      setIsPlaying(false);
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  };

  const toggleSound = async () => {
    if (isPlaying) {
      await pauseSound();
    } else {
      await playSound();
    }
  };

  return { isPlaying, toggleSound };
}

export default function HomeScreen() {
  const audioSource = require("../../assets/sounds/white-noise.mp3");
  const { isPlaying, toggleSound } = useAudio(audioSource);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          White Noise
        </ThemedText>

        <Pressable style={styles.playButton} onPress={toggleSound}>
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
