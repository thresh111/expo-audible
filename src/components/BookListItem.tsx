import { AntDesign } from "@expo/vector-icons";
import { Image, Text, View, Pressable } from "react-native";
import { usePlay } from "@/providers/PlayProvider";
import { Link } from "expo-router";
import { Book } from "@/types";

type BookListItemProps = {
  book: Book;
};

export default function BookListItem({ book }: BookListItemProps) {
  const { setBook, playStatus, book: currentBook, player } = usePlay();

  return (
    <Link href={"/player"} asChild>
      <Pressable className={"flex-row gap-4 items-center"} onPress={() => setBook(book)}>
        <Image source={{ uri: book.thumbnail_url }} className="w-16 rounded-md aspect-square" />
        <View className={"gap-2 flex-1"}>
          <Text className="text-gray-100 text-2xl font-bold">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <View className="flex-row gap-4 ">
          <Pressable
            onPress={() => {
              setBook(book);
              playStatus.playing && currentBook?.id === book.id ? player.pause() : player.play();
            }}
          >
            <AntDesign
              name={currentBook?.id === book.id && playStatus.playing ? "pause" : "play"}
              size={24}
              color={"gainsboro"}
            />
          </Pressable>
          <AntDesign name={"download"} size={24} color={"gainsboro"} />
        </View>
      </Pressable>
    </Link>
  );
}
