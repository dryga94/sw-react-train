import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import AppContainer from './components/app';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
