import useRobotoFontsHook from "@/hooks/useRobotoFonts";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export default function RootLayout() {
  const [loaded, error] = useRobotoFontsHook();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
