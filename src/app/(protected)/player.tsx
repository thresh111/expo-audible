import { View, Text, Pressable, Image } from "react-native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import dummyBooks from "@/dummyBooks";
import { SafeAreaView } from "react-native-safe-area-context";
import PlaybackBar from "@/components/PlaybackBar";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const book = dummyBooks[0];

export default function Player() {
  const router = useRouter();

  const player = useAudioPlayer({ uri: book.audio_url });
  const playerStatus = useAudioPlayerStatus(player);

  return (
    <SafeAreaView className={"flex-1 items-center p-4 py-10"}>
      <Pressable className={"absolute top-12 left-4 rounded-full p-2 bg-slate-800/80"} onPress={() => router.back()}>
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>

      <Image source={{ uri: book.thumbnail_url }} className={"w-[80%] aspect-square rounded-3xl self-center mt-8"} />

      <View className={"gap-6 flex-1 justify-end w-full mb-8"}>
        <Text className="text-white text-2xl font-bold text-center">{book.title}</Text>

        <PlaybackBar currentTime={playerStatus.currentTime} duration={playerStatus.duration} />

        <View className="flex-row items-center justify-between mt-4">
          <Pressable className="p-2">
            <Ionicons name="play-skip-back" size={24} color="white" />
          </Pressable>
          <Pressable className="p-2">
            <Ionicons name="play-back" size={24} color="white" />
          </Pressable>

          <Pressable
            className="p-4 bg-white/10 rounded-full"
            onPress={() => (playerStatus.playing ? player.pause() : player.play())}
          >
            <Ionicons name={playerStatus.playing ? "pause" : "play"} size={50} color="white" />
          </Pressable>

          <Pressable className="p-2">
            <Ionicons name="play-forward" size={24} color="white" />
          </Pressable>
          <Pressable className="p-2">
            <Ionicons name="play-skip-forward" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
