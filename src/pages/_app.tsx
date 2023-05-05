import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import Signature from "./components/sticky_signature";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Signature />
    </QueryClientProvider>
  );
}
