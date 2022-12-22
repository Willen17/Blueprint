import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { theme } from '../components/theme';
import UserContextProvider from '../context/UserContext';
import '../stylesheet/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </ThemeProvider>
  );
}
