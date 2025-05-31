import { View, Text, Pressable } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export default function Player() {
  const router = useRouter();
  return (
    <View className={"flex-1 bg-gray-900  items-center justify-center"}>
      <Pressable className={"absolute top-16 left-4 rounded-full p-2 bg-slate-800"} onPress={() => router.back()}>
        <Entypo name="chevron-down" size={24} color="black" />
      </Pressable>
      <Text className={"text-white"}>Player</Text>
    </View>
  );
}
