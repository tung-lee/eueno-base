import '@/styles/globals.css';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect, type ReactElement, type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { initEndpoint } from '@eueno/lib-browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const ENDPOINT = 'https://v2-developers.eueno.io/';
// @ts-ignore
momentDurationFormatSetup(moment);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth: any;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  useEffect(() => {
    initEndpoint(ENDPOINT);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
    </QueryClientProvider>
  );
}

export default App;
