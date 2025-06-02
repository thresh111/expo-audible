import { AntDesign } from "@expo/vector-icons";
import { Image, Text, View, Pressable } from "react-native";
import { usePlay } from "@/providers/PlayProvider";
import { Link } from "expo-router";
import { Book } from "./BookListItem";
import { useSupabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-expo";

type DiscoveryBookListItemProps = {
  book: Book;
};

export default function DiscoveryBookListItem({ book }: DiscoveryBookListItemProps) {
  const supabase = useSupabase();

  const { user } = useUser();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () =>
      await supabase
        .from("user-books")
        .insert({
          user_id: user?.id,
          position: 0,
          book_id: book.id,
        })
        .throwOnError(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-books"] });
    },
  });

  return (
    <Link href={"/player"} asChild>
      <Pressable className={"flex-row gap-4 items-center"}>
        <Image source={{ uri: book.thumbnail_url }} className="w-16 rounded-md aspect-square" />
        <View className={"gap-2 flex-1"}>
          <Text className="text-gray-100 text-2xl font-bold">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <View className="flex-row gap-4 ">
          <AntDesign name={"plus"} size={24} color={"gainsboro"} onPress={() => mutate()} />
        </View>
      </Pressable>
    </Link>
  );
}
