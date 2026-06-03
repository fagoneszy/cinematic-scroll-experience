import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('AETHERIS encountered an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-black flex items-center justify-center select-none">
          <div className="text-center max-w-md px-6">
            <div className="relative w-14 h-14 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <span className="font-mono text-lg font-semibold text-white/60">A</span>
            </div>
            <h1 className="text-xl font-sans font-light tracking-tight text-white/80 uppercase mb-3">
              Something went wrong
            </h1>
            <p className="text-sm font-mono text-zinc-500 tracking-[0.1em] mb-8">
              The cinematic stream encountered an error. Please reload the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-[0.2em] uppercase px-6 py-3 transition-colors duration-300 cursor-pointer"
            >
              RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
