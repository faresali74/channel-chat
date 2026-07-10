import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthFooter from "../components/forms/AuthFooter";
import AuthHeader from "../components/forms/AuthHeader";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../Context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await register({
        username,
        password,
        displayName,
      });

      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl border-0 p-8 shadow-xl">
        <div className="space-y-6">
          <AuthHeader
            title="Create Account"
            subtitle="Create your account to continue"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <FormField
              label="Display Name"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <FormField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <AuthFooter
            text="Already have an account?"
            action="Login"
            to="/login"
          />
        </div>
      </Card>
    </main>
  );
}

export default RegisterPage;
