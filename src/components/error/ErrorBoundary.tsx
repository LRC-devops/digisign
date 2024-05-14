import React from 'react'
type Props = any;
type State = { hasError: boolean, error: Error | null }
class ErrorBoundary extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(err: Error) {
    return { hasError: true, error: err }
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo): void {
    console.error('[error-boundary]: error:', error, "\n error-info: ", _errorInfo)
    this.state = { hasError: true, error: error }
  }

  render() {
    if (this.state.hasError) {
      return <div className='bg-red-800/50 rounded-s overflow-hidden w-full h-full flex flex-col items-center justify-center p-10 text-center' >
        <h3 className='text-2xl mb-3 text-center'>Something went wrong...</h3>
        {this.state.error && <p>{this.state.error.message}</p>}
      </div>
    }
    return this.props.children
  }
}

export default ErrorBoundary
