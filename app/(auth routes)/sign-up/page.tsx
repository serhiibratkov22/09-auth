'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUp() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const handleRegister = async (formData: FormData) => {
    setError('');

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    } as RegisterRequest;

    try {
      const user = await register(data);
      setUser(user);
      router.push('/profile');
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      setError(err.response?.data?.error || 'Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleRegister}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
