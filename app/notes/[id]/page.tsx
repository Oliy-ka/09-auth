import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NotePageProps {
  params: { id: string };
}

export default async function NoteDetails({params}: NotePageProps) {
  const queryClient = new QueryClient();
  const { id } =  params;


    await queryClient.prefetchQuery({
      queryKey: ["notes", id],
      queryFn: () => fetchNoteById(id),
    });

    return (<div>
        <h1>Note Details</h1>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
        </HydrationBoundary>
    </div>);
}