import "./global.css";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, View } from "react-native";
import books from "./src/dummyBooks";
import BookListItem from "./src/components/BookListItem";

export default function App() {
  return (
    <View className="bg-slate-950 flex-1 justify-center p-4 pt-20">
      <FlatList
        data={books}
        contentContainerClassName={"gap-4"}
        renderItem={({ item }) => <BookListItem book={item} key={item.id} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}
