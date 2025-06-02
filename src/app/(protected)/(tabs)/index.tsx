import { FlatList, RefreshControl, Text } from "react-native";
import BookListItem from "@/components/BookListItem";
import { useQuery } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";

export default function App() {
  const supabase = useSupabase();

  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["user-books"],
    queryFn: async () => {
      const { data } = await supabase.from("user-books").select("book_id, book:books(*)").throwOnError();
      return data as { book_id: string; book: any }[];
    },
  });

  if (isLoading) return <Loading />;

  if (error) return <Text>Error:{error.message}</Text>;

  if (data?.length === 0) return <Empty />;

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          tintColor="#fff"
          colors={["#fff"]}
          progressBackgroundColor="#1f2937"
        />
      }
      data={data}
      contentContainerClassName={"gap-4 p-2"}
      renderItem={({ item }) => <BookListItem book={item.book} key={item.book_id} />}
    />
  );
}
