import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { fetchNoteById } from '@/lib/api/api';

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note",  id ],
    queryFn: () => fetchNoteById(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <NotePreviewClient/>
    </HydrationBoundary>
  );
};

export default NotePreviewPage;