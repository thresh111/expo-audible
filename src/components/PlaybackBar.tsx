import { formatTime } from "@/utils";
import { useState } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

type PlaybackBarType = { currentTime: number; duration: number; onSeek: (seconds: number) => void };

export default function PlaybackBar({ currentTime, duration, onSeek }: PlaybackBarType) {
  const progress = currentTime / duration;

  const [layoutX, setLayoutX] = useState(0);

  const handleSeek = (event: GestureResponderEvent) => {
    const seekTo = Math.min(Math.max((event.nativeEvent.locationX / layoutX) * duration, 0), duration);

    onSeek(seekTo);
  };

  return (
    <View className="w-full flex-col gap-2">
      <Pressable
        onPress={handleSeek}
        className="w-full bg-slate-900 h-2 rounded-full justify-center"
        onLayout={(event) => setLayoutX(event.nativeEvent.layout.width)}
        onTouchMove={handleSeek}
        hitSlop={10}
      >
        <View className="bg-orange-400 h-full rounded-full" style={{ width: `${progress * 100}%` }} />
        <View
          className="absolute w-3 h-3 -translate-x-1/2 rounded-full bg-orange-400"
          style={{ left: `${progress * 100}%` }}
        />
      </Pressable>
      <View className="flex-row justify-between">
        <Text className="text-gray-400 text-sm">{formatTime(currentTime)}</Text>
        <Text className="text-gray-400 text-sm">{formatTime(duration)}</Text>
      </View>
    </View>
  );
}
