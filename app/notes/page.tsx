import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { fetchNotes  } from "@/lib/api";

export default async function NotePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1}],
    queryFn: () => fetchNotes({ search: "", page: 1 }),
  });

  return (
    <div>
      <h1>Tasks page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes />
      </HydrationBoundary>
    </div>
  );
}


