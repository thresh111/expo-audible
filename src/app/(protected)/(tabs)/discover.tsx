import { ActivityIndicator, FlatList, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import BookListItem, { Book } from "@/components/BookListItem";
import { useSupabase } from "@/lib/supabase";
import DiscoveryBookListItem from "@/components/DiscoveryBookListItem";

export default function Discover() {
  const supabase = useSupabase();

  const { data, error, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await supabase.from("books").select("*").throwOnError();
      return data as Book[];
    },
  });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Error:{error.message}</Text>;

  return (
    <FlatList
      data={data || []}
      contentContainerClassName={"gap-4 p-2"}
      renderItem={({ item }) => <DiscoveryBookListItem book={item} key={item.id} />}
    />
  );
}
