import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// This is a component that will catch errors and display a fallback UI
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="text-destructive mb-4 text-2xl font-bold">
              Sorry! Something went wrong
            </h2>
            <p className="text-gray-500 mb-4">
              We're sorry, an unexpected error occurred in the application.
            </p>
            <button onClick={() => window.location.reload()}>
              Reload the page
            </button>
            {import.meta.env.DEV && (
              <div className="mt-4 rounded-lg bg-gray-100 p-4">
                <p className="text-muted text-sm">Error details:</p>
                <pre className="text-destructive mt-2 overflow-auto text-xs">
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
