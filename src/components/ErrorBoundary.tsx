import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './atoms/actions/Button';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                        </div>
                        <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
                        <p className="text-zinc-400 text-sm mb-6">
                            We encountered an unexpected error. Please try reloading the page.
                        </p>
                        {this.state.error && (
                            <div className="w-full bg-zinc-950 p-3 rounded mb-6 text-left overflow-auto max-h-32">
                                <code className="text-xs text-red-400 font-mono">
                                    {this.state.error.message}
                                </code>
                            </div>
                        )}
                        <Button
                            onClick={() => window.location.reload()}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reload Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
