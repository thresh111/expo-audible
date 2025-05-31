import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { ActionSheetIOS, ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name={"index"}
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => <Ionicons name="library" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name={"discover"}
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
