import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/ui/SEO";
import { ROUTES } from "@/config/routes";

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast("Welcome back!", "success");
      navigate(from || ROUTES.STUDENT, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Login" description="Login to your AXON account" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
              <p className="text-sm text-neutral-500 mt-1">Login to continue your learning journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-error-50 border border-error-200 flex items-start gap-2 animate-slide-down">
                <AlertCircle className="h-4 w-4 text-error-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                autoComplete="email"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
                autoComplete="current-password"
                required
              />

              <div className="flex items-center justify-end">
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link to={ROUTES.SIGNUP} className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
