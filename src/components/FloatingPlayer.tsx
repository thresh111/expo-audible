import { View, Text, Pressable, Image } from "react-native";

import dummyBooks from "@/dummyBooks";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const book = dummyBooks[0];

export default function FloatingPlayer() {
  const player = useAudioPlayer({ uri: book.audio_url });
  const playerStatus = useAudioPlayerStatus(player);

  return (
    <Link href={"/player"} asChild>
      <Pressable className={"flex-row gap-4 items-center bg-slate-900 p-2 px-4"}>
        <Image source={{ uri: book.thumbnail_url }} className="w-16 rounded-md aspect-square" />
        <View className={"gap-2 flex-1"}>
          <Text className="text-gray-100 text-2xl font-bold">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <View className="flex-row gap-4 ">
          <AntDesign
            name={playerStatus.playing ? "pause" : "play"}
            size={24}
            hitSlop={20}
            color={"gainsboro"}
            onPress={() => (playerStatus.playing ? player.pause() : player.play())}
          />
        </View>
      </Pressable>
    </Link>
  );
}
