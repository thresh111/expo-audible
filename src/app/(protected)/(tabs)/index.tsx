import { ActivityIndicator, FlatList, Text } from "react-native";
import BookListItem from "@/components/BookListItem";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";

export default function App() {
  const supabase = useSupabase();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-books"],
    queryFn: async () => {
      const { data } = await supabase.from("user-books").select("book_id, book:books(*)").throwOnError();
      return data as { book_id: string; book: any }[];
    },
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error:{error.message}</Text>;

  return (
    <FlatList
      data={data}
      contentContainerClassName={"gap-4 p-2"}
      renderItem={({ item }) => <BookListItem book={item.book} key={item.book_id} />}
    />
  );
}
