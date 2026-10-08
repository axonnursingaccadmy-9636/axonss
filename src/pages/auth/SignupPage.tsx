import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/ui/SEO";
import { ROUTES } from "@/config/routes";

export default function SignupPage() {
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      showToast("Account created successfully!", "success");
      navigate(ROUTES.STUDENT, { replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Sign Up" description="Create your AXON account" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-neutral-900">Create Account</h1>
              <p className="text-sm text-neutral-500 mt-1">Start your nursing exam prep journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-error-50 border border-error-200 flex items-start gap-2 animate-slide-down">
                <AlertCircle className="h-4 w-4 text-error-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                leftIcon={<User className="h-4 w-4" />}
                autoComplete="name"
                required
              />

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
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                hint="At least 6 characters"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                required
              />

              <Button type="submit" fullWidth size="lg" loading={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
                Create Account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
