'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <div className="auth-layout">{children}</div>;
}
