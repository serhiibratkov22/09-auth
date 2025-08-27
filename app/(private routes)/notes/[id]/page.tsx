import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from '@/app/(private routes)/notes/[id]/NoteDetails.client';
import type { Metadata } from 'next';

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteByIdServer(id);

  return {
    title: `${note.title}`,
    description: `${note.content.slice(0, 100)}`,
    openGraph: {
      title: `${note.title}`,
      description: `${note.content.slice(0, 100)}`,
      url: `https://yourdomain.com/notes/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${note.title}`,
        },
      ],
      type: 'website',
    },
  };
}

const NoteDetailsPage = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};
export default NoteDetailsPage;
