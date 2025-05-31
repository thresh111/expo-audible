import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="bg-slate-950 flex-1 items-center justify-center">
      <Text className="text-red-500 text-2xl font-bold">Hello World123</Text>
      <StatusBar style="auto" />
    </View>
  );
}
