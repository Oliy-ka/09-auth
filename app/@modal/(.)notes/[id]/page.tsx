import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';
import { getNoteById } from '@/lib/api/serverApi';


type Props = {
  params: Promise<{ id: string }>;
};

const NotePreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note",  id ],
    queryFn: () => getNoteById(id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
       <NotePreviewClient/>
    </HydrationBoundary>
  );
};

export default NotePreviewPage;