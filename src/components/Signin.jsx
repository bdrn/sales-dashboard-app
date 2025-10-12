import { useActionState } from "react";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const { signInUser } = useAuth();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);

      if (signInError) {
        return new Error(signInError);
      }
      if (success && data?.session) {
        //Navigate to /dashboard
        return null;
      }
      return null;
    },
    null,
  );

  return (
    <>
      <h1 className="landing-header">Sales Dashboard</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign In</h2>
          <p>
            Don't have an account yet? {/* <Link className="form-link" */}
            Sign Up
            {/* </Link> */}
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <button type="submit" className="form-button" aria-busy={isPending}>
            {isPending ? "Signing in" : "Sign in"}
          </button>

          {error && (
            <div
              id="signin-error"
              role="alert"
              className="sign-form-error-message"
            >
              {error.message}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;
