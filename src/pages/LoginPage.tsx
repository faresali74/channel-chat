import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthFooter from "../components/forms/AuthFooter";
import AuthHeader from "../components/forms/AuthHeader";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAuth } from "../Context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login({
        username,
        password,
      });

      navigate("/channels");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed.");
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
            title="Welcome Back"
            subtitle="Enter your details to access your account"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <AuthFooter
            text="Don't have an account?"
            action="Register"
            to="/register"
          />
        </div>
      </Card>
    </main>
  );
}

export default LoginPage;
