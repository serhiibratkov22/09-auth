import { fetchProfileServer } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import ProfileClient from './Profile.client';

export const metadata: Metadata = {
  title: 'User Profile | MyApp',
  description: 'View and manage your user profile information.',
  keywords: ['profile', 'user account', 'settings', 'MyApp'],
  openGraph: {
    title: 'User Profile | MyApp',
    description: 'View and manage your user profile information.',
    url: 'https://your-domain.com/profile',
    siteName: 'MyApp',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile Page',
      },
    ],
    type: 'website',
  },
};

export default async function ProfilePage() {
  const user = await fetchProfileServer();

  return <ProfileClient initialUser={user} />;
}
