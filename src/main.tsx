import { ModalsProvider, NotificationsProvider, ThemeProvider } from '@inflearn/ds-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider cdnLink="https://cdn.devinflearn.com">
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <NotificationsProvider limit={3} position="bottom-center" />
          <App />
        </ModalsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
