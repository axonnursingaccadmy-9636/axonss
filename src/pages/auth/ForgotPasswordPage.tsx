import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/ui/SEO";
import { ROUTES } from "@/config/routes";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send reset email.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Forgot Password" description="Reset your AXON account password" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-4">
                <div className="h-14 w-14 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7 text-success-500" />
                </div>
                <h1 className="text-xl font-bold text-neutral-900">Check Your Email</h1>
                <p className="text-sm text-neutral-500 mt-2 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. Follow the link to reset your password.
                </p>
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" fullWidth leftIcon={<ArrowLeft className="h-4 w-4" />}>
                    Back to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-neutral-900">Forgot Password</h1>
                  <p className="text-sm text-neutral-500 mt-1">
                    Enter your email and we'll send you a reset link
                  </p>
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

                  <Button type="submit" fullWidth size="lg" loading={loading}>
                    Send Reset Link
                  </Button>
                </form>

                <p className="mt-6 text-center">
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Back to Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
