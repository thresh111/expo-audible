import { AntDesign } from "@expo/vector-icons";
import { Image, Text, View, Pressable } from "react-native";
import { usePlay } from "@/providers/PlayProvider";
import { Link } from "expo-router";

export type Book = {
  id: string;
  title: string;
  author: string;
  audio_url: string;
  thumbnail_url?: string;
};

type BookListItemProps = {
  book: Book;
};

export default function BookListItem({ book }: BookListItemProps) {
  const { setBook } = usePlay();

  return (
    <Link href={"/player"} asChild>
      <Pressable className={"flex-row gap-4 items-center"} onPress={() => setBook(book)}>
        <Image source={{ uri: book.thumbnail_url }} className="w-16 rounded-md aspect-square" />
        <View className={"gap-2 flex-1"}>
          <Text className="text-gray-100 text-2xl font-bold">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <View className="flex-row gap-4 ">
          <AntDesign name={"playcircleo"} size={24} color={"gainsboro"} />
          <AntDesign name={"download"} size={24} color={"gainsboro"} />
        </View>
      </Pressable>
    </Link>
  );
}
