import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details to an external service (e.g., Sentry, LogRocket)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert className="border-red-600 mt-4 fixed top-2">
          <AlertTitle>Something went wrong.</AlertTitle>
          <AlertDescription className="text-red-600">
            <p> {this.state.error?.toString()}</p>
            {this.state.errorInfo && (
              <details>{this.state.errorInfo.componentStack}</details>
            )}
          </AlertDescription>
        </Alert>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
