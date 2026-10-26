import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSigninMutation, useSignupMutation } from '../features/auth/authApi';

type AuthPageProps = {
  mode: 'signup' | 'signin';
};

function AuthPage({ mode }: AuthPageProps) {

  const [signup, { isLoading,  isError, error, data }] = useSignupMutation();
  const [signin] = useSigninMutation();

  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [created, setCreated] = useState(false);


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const result = await signup({
        username,
        email,
        password
      }).unwrap()


        console.log("******")
        console.log("******")
        console.log("Response", result.message);
        console.log("******")
        console.log("******")


      if (!isError) {
        console.log("******")
        console.log("******")
        console.log("Response", result.message);
        console.log("******")
        console.log("******")
      }
    } catch (error) {
      console.error("Signup failed:", error);
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
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
      </section>

      <p className="mt-7 text-center text-sm text-[#747987]">
        {isSignup ? 'Already have an account?' : 'New to Kinetic?'}{' '}
        <Link className="font-semibold text-primary hover:underline" to={isSignup ? '/signin' : '/signup'}>
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
