import { FlatList, Text, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types";
import { useSupabase } from "@/lib/supabase";
import DiscoveryBookListItem from "@/components/DiscoveryBookListItem";
import Loading from "@/components/Loading";
import Empty from "@/components/Empty";

export default function Discover() {
  const supabase = useSupabase();

  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data } = await supabase.from("books").select("*").throwOnError();
      return data as Book[];
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
      data={data || []}
      contentContainerClassName={"gap-4 p-2"}
      renderItem={({ item }) => <DiscoveryBookListItem book={item} key={item.id} />}
    />
  );
}
