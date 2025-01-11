import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import Routes from './routes';
import ErrorBoundary from './lib/ErrorBoundary';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={client}>
        <Routes />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
