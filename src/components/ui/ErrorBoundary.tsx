import { type ReactNode, Component, type ErrorInfo } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-neutral-50">
          <div className="h-16 w-16 rounded-full bg-error-50 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-error-500" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-neutral-900">Something went wrong</h1>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm">
              An unexpected error occurred. Try refreshing the page.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={this.handleReset}
            leftIcon={<RotateCw className="h-4 w-4" />}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
