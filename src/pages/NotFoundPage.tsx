import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/ui/SEO";
import { ROUTES } from "@/config/routes";

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl font-bold text-primary-200">404</h1>
          <h2 className="text-2xl font-bold text-neutral-900 mt-2">Page Not Found</h2>
          <p className="text-neutral-500 mt-2 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={ROUTES.HOME}>
              <Button variant="primary" leftIcon={<Home className="h-4 w-4" />}>
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
