import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSSO } from "@clerk/clerk-expo";
import { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function OAuth() {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleSSO = async (strategy: "oauth_google" | "oauth_github") => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      } else {
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-row justify-center items-center mt-6 gap-2">
      <Pressable
        className="flex-1 h-full p-2 w-1/2 bg-gray-800 rounded-md flex-col items-center gap-2"
        onPress={() => handleSSO("oauth_google")}
      >
        <AntDesign name={"google"} size={24} color={"white"} />
        <Text className="text-white/60">Continue with Google</Text>
      </Pressable>
      <Pressable
        className="flex-1h-full p-2 w-1/2 bg-gray-800 rounded-md flex-col items-center gap-2"
        onPress={() => handleSSO("oauth_github")}
      >
        <AntDesign name={"github"} size={24} color={"white"} />
        <Text className="text-white/60">Continue with Github</Text>
      </Pressable>
    </View>
  );
}
