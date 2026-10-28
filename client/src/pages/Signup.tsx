import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../app/hooks";
import { useSignupMutation } from "../features/auth/authApi";
import { signupSchema } from "../utils/schema";

interface ISignup {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isSuccess }] = useSignupMutation();

  const { handleSubmit, control, formState } = useForm<ISignup>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<ISignup> = async ({ username, email, password }) => {
    try {
      const result = await signup({
        username,
        email,
        password
      }).unwrap();

        toast.success(result.message);
        navigate("/signin");
    } catch (error) {
      console.log(`Signup failed ${error}`);
    }
  };

  return (
    <main className="auth-background flex min-h-screen flex-col items-center px-5 py-8 text-[#252936] sm:px-8 sm:py-10">
      <Link
        className="text-4xl font-bold tracking-tight text-[#252936] transition-colors duration-200 hover:text-primary sm:text-5xl"
        to="/home"
      >
        Kinetic
      </Link>
      <p className="mt-2 text-center text-base text-[#626776] sm:text-lg">
        Create your workspace
      </p>

      <section className="my-auto w-full max-w-110 rounded-[26px] border border-white/80 bg-white/90 px-7 py-8 shadow-[0_18px_50px_rgba(30,35,60,0.08)] sm:px-10 sm:py-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <label className="block" htmlFor="username">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">
                    Full name
                  </span>
                  <input
                    {...field}
                    autoComplete="name"
                    id="username"
                    className="mt-2 w-full border-0 border-b border-[#e4e6ec] bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:border-primary focus:ring-0"
                    name="username"
                    placeholder="E.g., Julian Thorne"
                    type="text"
                    required
                  />
                  {formState.errors.username &&
                  formState.touchedFields.username ? (
                    <div className="bg-red-200 text-red-900 rounded-2xl mt-1.5 py-3 px-3">
                      {formState.errors.username.message}
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <label className="block" htmlFor="email">
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">
                    Email address
                  </span>
                  <input
                    {...field}
                    autoComplete="email"
                    className="mt-2 w-full border-0 border-b border-[#e4e6ec] bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:border-primary focus:ring-0"
                    name="email"
                    placeholder="julian@workspace.com"
                    required
                    id="email"
                    type="email"
                  />
                  {formState.errors.email && formState.touchedFields.email ? (
                    <div className="bg-red-200 text-red-900 rounded-2xl mt-1.5 py-3 px-3">
                      {formState.errors.email.message}
                    </div>
                  ) : (
                    ""
                  )}
                </label>
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <label className="block" htmlFor="password">
                  <span className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#727786]">
                    <span>Password</span>
                  </span>
                  <span className="mt-2 flex items-center border-b border-[#e4e6ec] focus-within:border-primary">
                    <input
                      {...field}
                      autoComplete="current-password"
                      className="min-w-0 flex-1 border-0 bg-transparent px-0 py-2.5 text-sm text-[#252936] outline-none placeholder:text-[#b4b8c2] focus:ring-0"
                      minLength={8}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                      type={showPassword ? "text" : "password"}
                    />

                    <button
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="rounded p-1 text-[#858a97] hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                      onClick={() => setShowPassword((visible) => !visible)}
                      type="button"
                    >
                      {showPassword ? (
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="18"
                          viewBox="0 0 24 24"
                          width="18"
                        >
                          <path
                            d="M3 3l18 18M10.6 10.7a2 2 0 002.7 2.7M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.2 3.1M6.2 6.3C3.8 7.7 2.7 10 2.5 12c.9 2.5 4.5 7 9.5 7 1.3 0 2.5-.3 3.5-.8"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                          />
                        </svg>
                      ) : (
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="18"
                          viewBox="0 0 24 24"
                          width="18"
                        >
                          <path
                            d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="2.5"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          />
                        </svg>
                      )}
                    </button>
                  </span>
                </label>

                {formState.errors.password &&
                formState.touchedFields.password ? (
                  <div className="bg-red-200 text-red-900 rounded-2xl mt-1.5 py-3 px-3">
                    {
                      <div className="bg-red-200 text-red-900 rounded-2xl mt-1.5 py-1">
                        <p>Must be : </p>
                        <div className="flex flex-col">
                          <p>
                            * Start with a letter (either uppercase or
                            lowercase).
                          </p>
                          <p>* Be between 6 and 9 characters in total.</p>
                          <p>
                            * Can only contain letters (A-Z or a-z) and numbers
                            (0-9)
                          </p>
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          />

          <button
            className="w-full rounded-full cursor-pointer bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_16px_rgba(53,70,165,0.22)] transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
            type="submit"
          >
            Join Kinetic
          </button>
        </form>
      </section>

      <p className="text-center text-sm text-[#747987]">
        Already have an account?{" "}
        <Link
          className="font-semibold text-primary hover:underline"
          to="/signin"
        >
          Log in
        </Link>
      </p>
      <footer className="mt-8 flex gap-6 text-xs text-[#a1a5af]">
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </footer>
    </main>
  );
}

export default Signup;
