import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/Protected';
import { theme } from '../components/theme';
import CanvasContextProvider from '../context/CanvasContext';
import NotificationContextProvider from '../context/NotificationContext';
import SidebarContextProvider from '../context/SidebarContext';
import UploadContextProvider from '../context/UploadContext';
import UserContextProvider from '../context/UserContext';
import '../stylesheet/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotificationContextProvider>
        <SidebarContextProvider>
          <CanvasContextProvider>
            <UserContextProvider>
              <UploadContextProvider>
                <ProtectedRoute>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ProtectedRoute>
              </UploadContextProvider>
            </UserContextProvider>
          </CanvasContextProvider>
        </SidebarContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  );
}
