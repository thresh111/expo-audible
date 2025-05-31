import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import books from "./src/dummyBooks";
import BookListItem from "./src/components/BookListItem";

export default function App() {
  return (
    <View className="bg-slate-950 flex-1 justify-center p-4">
      <View className="flex-1 gap-4">
        {books.map((book) => {
          return <BookListItem key={book.id} book={book} />;
        })}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
