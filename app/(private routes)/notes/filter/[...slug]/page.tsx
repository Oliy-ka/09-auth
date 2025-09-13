import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Notes from "./Notes.client";
import { Metadata } from "next";
import { getNotes } from "@/lib/api/serverApi";


type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata>  {
  const { slug } = params;
  const tag = slug[0] === 'All' ? undefined : slug[0];
  return {
    title: `NoteHub - Filtered by ${tag}`,
    description: `Browse your notes filtered by "${tag}" in NoteHub. Organize and manage your notes easily.`,
    openGraph: {
      title: `NoteHub - Filtered by ${tag}`,
      description: `Browse your notes filtered by "${tag}" in NoteHub. Organize and manage your notes easily.`,
      url: `https://notehub.com/notes/${tag ?? "All"}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag || "NoteHub",
        },
      ],
    },
  }
}


export default async function NotePage({params}: Props) {
  const queryClient = new QueryClient();

  const { slug } =  params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, tag }],
    queryFn: () => getNotes({ search: "", page: 1, tag }),
  });

  return (
    <div>
      <h1>Tasks page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes tag={tag} />
      </HydrationBoundary>
    </div>
  );
}

