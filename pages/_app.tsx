import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import UserContextProvider from '../context/UserContext';
import '../stylesheet/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
