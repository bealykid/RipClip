import { Component } from "react";

export class ReportsBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(err, info) {
    console.error("[ReportsBoundary] Reports page crashed:", err, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-white">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Reports Temporarily Unavailable</h2>
              <p className="text-gray-400 mb-6">
                Something went wrong loading the reports page. This has been logged for investigation.
              </p>
            </div>
            <button 
              onClick={() => this.setState({ error: null })}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

