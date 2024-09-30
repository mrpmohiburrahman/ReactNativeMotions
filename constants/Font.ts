// constants/fonts.ts

import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

/**
 * Type representing all available Roboto font variants.
 */
export type RobotoFont =
  | "Roboto_100Thin"
  | "Roboto_100Thin_Italic"
  | "Roboto_300Light"
  | "Roboto_300Light_Italic"
  | "Roboto_400Regular"
  | "Roboto_400Regular_Italic"
  | "Roboto_500Medium"
  | "Roboto_500Medium_Italic"
  | "Roboto_700Bold"
  | "Roboto_700Bold_Italic"
  | "Roboto_900Black"
  | "Roboto_900Black_Italic";

/**
 * An object mapping Roboto font variant names to their respective font files.
 */
export const RobotoFonts: Record<RobotoFont, string> = {
  Roboto_100Thin: "Roboto_100Thin",
  Roboto_100Thin_Italic: "Roboto_100Thin_Italic",
  Roboto_300Light: "Roboto_300Light",
  Roboto_300Light_Italic: "Roboto_300Light_Italic",
  Roboto_400Regular: "Roboto_400Regular",
  Roboto_400Regular_Italic: "Roboto_400Regular_Italic",
  Roboto_500Medium: "Roboto_500Medium",
  Roboto_500Medium_Italic: "Roboto_500Medium_Italic",
  Roboto_700Bold: "Roboto_700Bold",
  Roboto_700Bold_Italic: "Roboto_700Bold_Italic",
  Roboto_900Black: "Roboto_900Black",
  Roboto_900Black_Italic: "Roboto_900Black_Italic",
};
