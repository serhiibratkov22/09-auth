'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { AxiosError } from 'axios';
import css from './SignInPage.module.css';
import { login, LoginRequest } from '@/lib/api/clientApi';

export default function SignIn() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const handleLogin = async (formData: FormData) => {
    setError('');
    const data: LoginRequest = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const user = await login(data);
      setUser(user);
      router.replace('/profile');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
