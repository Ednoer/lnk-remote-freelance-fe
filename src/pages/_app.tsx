import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import NextAdapterPages from 'next-query-params/pages';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryParamProvider } from 'use-query-params';
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  })
  return <QueryClientProvider client={queryClient}>
    <QueryParamProvider adapter={NextAdapterPages}>
        <Component {...pageProps} />
    </QueryParamProvider>
    <ToastContainer
      toastClassName="rounded-md"
      bodyClassName={() => "flex flex-row items-center text-black p-2"}
      closeButton={false}
    />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}
