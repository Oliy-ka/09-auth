import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/api";

interface NotePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: NotePageProps) : Promise<Metadata>{
  const { id } = params;
  const note = await fetchNoteById(id)
  return {
    title: `${note.title} | NoteHub`,
    description: note.content|| "View details of this note in NoteHub.",
    openGraph: {
      title: `${note.title} | NoteHub`,
      description: note.content|| "View details of this note in NoteHub.",
      url: `https://notehub.com/notes/${params.id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  }
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