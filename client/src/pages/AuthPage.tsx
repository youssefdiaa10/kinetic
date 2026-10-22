import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';

type AuthPageProps = {
  mode: 'signup' | 'login';
};

function AuthPage({ mode }: AuthPageProps) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [created, setCreated] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      ...(isSignup ? { username: String(formData.get('fullName')).trim() } : {}),
      email: String(formData.get('email')).trim(),
      password: String(formData.get('password')),
    };

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiBaseUrl}/auth/${isSignup ? 'signup' : 'signin'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(Array.isArray(result.message) ? result.message.join(' ') : result.message || 'Please try again.');
      }

      if (isSignup) {
        setCreated(true);
        setMessage('Your account is ready. Log in to continue.');
      } else {
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        navigate('/home');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to connect. Check that the API is running.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-background flex min-h-screen flex-col items-center px-5 py-8 text-[#252936] sm:px-8 sm:py-10">
      <Link className="text-4xl font-bold tracking-tight text-[#252936] transition-colors duration-200 hover:text-primary sm:text-5xl" to="/home">Kinetic</Link>
      <p className="mt-2 text-center text-base text-[#626776] sm:text-lg">
        {isSignup ? 'Create your workspace' : 'Welcome back'}
      </p>

      <section className="my-auto w-full max-w-[440px] rounded-[26px] border border-white/80 bg-white/90 px-7 py-8 shadow-[0_18px_50px_rgba(30,35,60,0.08)] sm:px-10 sm:py-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">Full name</span>
              <input
                autoComplete="name"
                className="mt-2 w-full border-0 border-b border-[#e4e6ec] bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:border-primary focus:ring-0"
                name="fullName"
                placeholder="E.g., Julian Thorne"
                required
              />
            </label>
          )}

          <label className="block">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">Email address</span>
            <input
              autoComplete="email"
              className="mt-2 w-full border-0 border-b border-[#e4e6ec] bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:border-primary focus:ring-0"
              name="email"
              placeholder="julian@workspace.com"
              required
              type="email"
            />
          </label>

          <label className="block">
            <span className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">
              <span>Password</span>
              {isSignup && <span className="normal-case tracking-normal text-[#9297a3]">8+ chars, uppercase, number & symbol</span>}
            </span>
            <span className="mt-2 flex items-center border-b border-[#e4e6ec] focus-within:border-primary">
              <input
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                className="min-w-0 flex-1 border-0 bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:ring-0"
                minLength={8}
                name="password"
                pattern={isSignup ? '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}' : undefined}
                placeholder={isSignup ? 'Create a strong password' : 'Enter your password'}
                required
                title={isSignup ? 'Use at least 8 characters with uppercase, lowercase, a number, and a symbol.' : undefined}
                type={showPassword ? 'text' : 'password'}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="rounded p-1 text-[#858a97] hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                {showPassword ? (
                  <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><path d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.2 3.1M6.2 6.3C3.8 7.7 2.7 10 2.5 12c.9 2.5 4.5 7 9.5 7 1.3 0 2.5-.3 3.5-.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>
                ) : (
                  <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18"><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>
                )}
              </button>
            </span>
          </label>

          <button
            className="w-full rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_16px_rgba(53,70,165,0.22)] transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
            disabled={busy || created}
            type="submit"
          >
            {busy ? 'Please wait…' : created ? 'Account created' : isSignup ? 'Join Kinetic' : 'Log in'}
          </button>
        </form>

        {message && (
          <p aria-live="polite" className={`mt-4 text-center text-sm ${created ? 'text-[#275e43]' : 'text-[#9b3548]'}`} role="status">
            {message}
          </p>
        )}

        {!created && (
          <>
            <div className="my-6 flex items-center gap-3 text-xs text-[#a1a5af]">
              <span className="h-px flex-1 bg-[#eceef2]" />
              <span>or continue with</span>
              <span className="h-px flex-1 bg-[#eceef2]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-full border border-[#e7e9ee] px-3 py-2.5 text-sm text-[#555b68] transition-colors duration-200 hover:border-[#c8cce0] hover:bg-[#fafaff]" onClick={() => setMessage('Google sign-up is not connected yet.')} type="button">
                <span className="text-base font-semibold text-[#4285f4]">G</span> Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-[#e7e9ee] px-3 py-2.5 text-sm text-[#555b68] transition-colors duration-200 hover:border-[#c8cce0] hover:bg-[#fafaff]" onClick={() => setMessage('Apple sign-up is not connected yet.')} type="button">
                <span aria-hidden="true" className="text-base">●</span> Apple
              </button>
            </div>
          </>
        )}
      </section>

      <p className="mt-7 text-center text-sm text-[#747987]">
        {isSignup ? 'Already have an account?' : 'New to Kinetic?'}{' '}
        <Link className="font-semibold text-primary hover:underline" to={isSignup ? '/login' : '/signup'}>
          {isSignup ? 'Log in' : 'Create an account'}
        </Link>
      </p>
      <footer className="mt-8 flex gap-6 text-xs text-[#a1a5af]">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </footer>
    </main>
  );
}

export default AuthPage;
