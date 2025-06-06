import { Redirect, Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import Loading from "@/components/Loading";

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{ headerShown: false, animation: "fade_from_bottom", animationDuration: 400 }}
      />
    </Stack>
  );
}
