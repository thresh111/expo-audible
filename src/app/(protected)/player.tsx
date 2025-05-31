import { View, Text, Pressable, Image } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import dummyBooks from "@/dummyBooks";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaybackBar from "@/components/PlaybackBar";

const book = dummyBooks[0];

export default function Player() {
  const router = useRouter();
  return (
    <SafeAreaView className={"flex-1 bg-gray-900 items-center p-4 py-10"}>
      <Pressable className={"absolute top-12 left-4 rounded-full p-2 bg-slate-800/80"} onPress={() => router.back()}>
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>

      <Image source={{ uri: book.thumbnail_url }} className={"w-[80%] aspect-square rounded-3xl self-center mt-8"} />

      <View className={"gap-6 flex-1 justify-end w-full mb-8"}>
        <Text className="text-white text-2xl font-bold text-center">{book.title}</Text>

        <PlaybackBar value={0.21} />

        <View className="flex-row items-center justify-between mt-4">
          <Pressable className="p-2">
            <Ionicons name="play-skip-back" size={28} color="white" />
          </Pressable>
          <Pressable className="p-2">
            <Ionicons name="play-back" size={28} color="white" />
          </Pressable>
          <Pressable className="p-4 bg-white/10 rounded-full">
            <Ionicons name="play" size={54} color="white" />
          </Pressable>
          <Pressable className="p-2">
            <Ionicons name="play-forward" size={28} color="white" />
          </Pressable>
          <Pressable className="p-2">
            <Ionicons name="play-skip-forward" size={28} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
