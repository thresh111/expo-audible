import { View, Text } from "react-native";

const Empty = () => {
  return (
    <View className="flex-1 bg-[#010D1A] justify-center items-center px-6">
      <Text className="text-white text-xl font-semibold mb-2">No Data</Text>
      <Text className="text-[#9CA3AF] text-base mb-8 text-center">There's nothing here yet</Text>
    </View>
  );
};

export default Empty;
