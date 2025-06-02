import "../../global.css";
import { Slot } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ClerkProvider } from "@clerk/clerk-expo";
import PlayProvider from "@/providers/PlayProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#010D1A",
    card: "#010D1A",
    primary: "#fff",
  },
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider tokenCache={tokenCache}>
          <PlayProvider>
            <Slot />
          </PlayProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
