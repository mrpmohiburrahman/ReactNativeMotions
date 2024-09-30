// src/components/AnimationListItem.tsx
import { useVideoPlayer, VideoView } from "expo-video"; // Ensure this is the correct package
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { RobotoFonts } from "@/constants/Font";
import { Colors } from "@/constants/Colors";
import { AnimationListDataType } from "@/constants/AnimationListData";
import { useIsFocused } from "@react-navigation/native"; // Adjust based on your navigation library

interface AnimationListItemProps {
  item: AnimationListDataType;
}

const AnimationListItem: React.FC<AnimationListItemProps> = ({ item }) => {
  const ref = useRef<VideoView | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isFocused = useIsFocused();

  // Initialize the video player only if videoSource is provided
  const player = item.videoSource
    ? useVideoPlayer(item.videoSource, (playerInstance) => {
        playerInstance.loop = true;
        if (isFocused) {
          playerInstance.play();
          setIsPlaying(true);
        }
      })
    : null;

  useEffect(() => {
    if (!player) return; // Exit if there's no player

    // Listen for playing state changes
    const subscription = player.addListener(
      "playingChange",
      (playing: boolean) => {
        setIsPlaying(playing);
      }
    );

    // Manage playback based on screen focus
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      console.log(`Cleaning up video for ${item.title}`);
      subscription.remove();
      player.pause(); // Pause the video
      // @ts-ignore
      if (player.destroy) {
        // @ts-ignore
        player.destroy(); // Destroy the player instance if available
      }
    };
  }, [player, isFocused, item.title]);

  return (
    <TouchableOpacity onPress={item.onPress} style={styles.touchable}>
      {item.videoSource ? (
        <VideoView
          ref={ref}
          style={styles.video}
          player={player!} // Non-null assertion since we checked videoSource
          contentFit="cover"
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />
      ) : (
        // Fallback UI when there's no videoSource
        <View style={[styles.video, styles.fallback]}>
          <Text style={styles.fallbackText}>No Video</Text>
        </View>
      )}
      <View>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      {/* Additional UI elements can be added here */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  video: {
    borderWidth: 2,
    borderColor: "#624E88",
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: "#000", // Default background color
    justifyContent: "center",
    alignItems: "center",
  },
  fallback: {
    backgroundColor: "#ccc", // Different background for fallback
  },
  fallbackText: {
    color: "#666",
    fontSize: 12,
  },
  touchable: {
    height: 100,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  text: {
    fontFamily: RobotoFonts.Roboto_400Regular,
    color: Colors.text,
    fontSize: 15,
  },
});

export default React.memo(AnimationListItem);
