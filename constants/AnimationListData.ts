// src/constants/AnimationListData.ts
import { router } from "expo-router";

export type AnimationListDataType = {
  title: string;
  onPress: () => void;
  videoSource?: number | { uri: string };
};

export const AnimationListData: AnimationListDataType[] = [
  {
    title: "Notion Calendar Animation",
    onPress: () => router.push("/NotionCaleder"),
    videoSource: require("@/assets/videos/notioncalendar.mp4"),
  },
  // Add more items as needed
];
