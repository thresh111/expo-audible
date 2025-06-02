import { ActivityIndicator, FlatList, Text } from "react-native";
import BookListItem, { Book } from "@/components/BookListItem";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";
import { useUser } from "@clerk/clerk-expo";

export default function App() {
  const supabase = useSupabase();

  const { user } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-books"],
    queryFn: async () => supabase.from("user-books").select("book_id, book:books(*)").throwOnError(),
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error:{error.message}</Text>;

  return (
    <FlatList
      data={data?.data}
      contentContainerClassName={"gap-4 p-2"}
      renderItem={({ item }) => <BookListItem book={item.book} key={item.book_id} />}
    />
  );
}
