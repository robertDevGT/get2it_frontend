import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from 'notistack';
import AppRouter from './router';
import './index.css'

const queryCliente = new QueryClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryCliente}>
      <AppRouter />
    </QueryClientProvider>
    <SnackbarProvider />
  </StrictMode>,
)
