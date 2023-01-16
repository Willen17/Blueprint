import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/Protected';
import { theme } from '../components/theme';
import CanvasContextProvider from '../context/CanvasContext';
import NotificationContextProvider from '../context/NotificationContext';
import SidebarContextProvider from '../context/SidebarContext';
import UserContextProvider from '../context/UserContext';
import '../stylesheet/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotificationContextProvider>
        <SidebarContextProvider>
          <CanvasContextProvider>
            <UserContextProvider>
              <ProtectedRoute>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ProtectedRoute>
            </UserContextProvider>
          </CanvasContextProvider>
        </SidebarContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  );
}
