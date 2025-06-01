import { formatTime } from "@/utils";
import { Text, View } from "react-native";

type PlaybackBarType = { currentTime: number; duration: number };

export default function PlaybackBar({ currentTime, duration }: PlaybackBarType) {
  const progress = currentTime / duration;

  return (
    <View className="w-full flex-col gap-2">
      <View className="w-full bg-slate-900 h-2 rounded-full justify-center">
        <View className="bg-orange-400 h-full rounded-full" style={{ width: `${progress * 100}%` }} />
        <View
          className="absolute w-3 h-3 -translate-x-1/2 rounded-full bg-orange-400"
          style={{ left: `${progress * 100}%` }}
        />
      </View>
      <View className="flex-row justify-between">
        <Text className="text-gray-400 text-sm">{formatTime(currentTime)}</Text>
        <Text className="text-gray-400 text-sm">{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
