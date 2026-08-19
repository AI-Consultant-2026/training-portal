import * as Sentry from "@sentry/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Class component because React (as of 18) has no hook-based way to catch render
// errors -- getDerivedStateFromError/componentDidCatch are the only mechanism. Without
// this, any unhandled render error (a malformed API response, a null field the UI
// didn't guard against) white-screens the whole app with no way out short of the user
// guessing to hit reload themselves.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
    // No-op when VITE_SENTRY_DSN isn't set (see instrument.ts) -- keeps this custom
    // fallback UI instead of swapping in Sentry's own <ErrorBoundary> component.
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600">
            An unexpected error occurred. Reloading the page usually fixes this.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
