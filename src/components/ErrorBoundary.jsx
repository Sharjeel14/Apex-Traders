import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '32px 20px',
            margin: '40px auto',
            maxWidth: '500px',
            textAlign: 'center',
            background: 'var(--bg-surface, #121721)',
            border: '1px solid var(--border-medium, #2d3b55)',
            borderRadius: '12px',
            color: 'var(--text-primary, #fff)',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Interface Reload Required</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #94a3b8)', marginBottom: '16px' }}>
            A chart rendering reset occurred. Click below to restore standard trading view.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.hash = '#/v2/home'
              window.location.reload()
            }}
            style={{
              padding: '8px 18px',
              borderRadius: '6px',
              background: 'var(--color-primary, #3b82f6)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
            }}
          >
            Reload Interface
          </button>

          {this.state.error && (
            <details style={{ marginTop: '16px', textAlign: 'left', fontSize: '0.72rem', color: '#ef4444' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>Diagnostic Info</summary>
              <pre style={{ overflowX: 'auto', padding: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', marginTop: '6px' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
