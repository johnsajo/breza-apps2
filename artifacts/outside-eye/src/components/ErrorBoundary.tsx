import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { hasError: true, message };
  }

  handleReset = () => {
    this.setState({ hasError: false, message: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            maxWidth: 740,
            margin: "80px auto",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#F87171",
              marginBottom: 16,
            }}
          >
            Something went wrong
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 15,
              color: "#B8B2A8",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            This room ran into an unexpected error. Your session notes are safe.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#B8B2A8",
              background: "none",
              border: "1px solid #2A2A2A",
              padding: "8px 16px",
              cursor: "pointer",
              transition: "color 150ms ease, border-color 150ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#F5F0E8";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#F5F0E8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#B8B2A8";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2A2A";
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
