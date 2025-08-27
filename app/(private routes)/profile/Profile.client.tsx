'use client';
import React, { useEffect } from 'react';
import type { User } from '@/types/user';
import Link from 'next/link';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

interface ProfileClientProps {
  initialUser: User | null;
}

export default function ProfileClient({ initialUser }: ProfileClientProps) {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser, setUser]);

  const currentUser = user || initialUser;

  if (!currentUser) {
    return (
      <main className={css.mainContent}>
        <p>You are not logged in.</p>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={currentUser.avatar || '/Avatar.jpg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      </div>
    </main>
  );
}
