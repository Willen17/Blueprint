import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/Protected';
import { theme } from '../components/theme';
import CanvasContextProvider from '../context/CanvasContext';
import NotificationContextProvider from '../context/NotificationContext';
import SaveContextProvider from '../context/SaveContext';
import SidebarContextProvider from '../context/SidebarContext';
import UploadContextProvider from '../context/UploadContext';
import UserContextProvider from '../context/UserContext';
import '../stylesheet/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <NotificationContextProvider>
        <SidebarContextProvider>
          <UserContextProvider>
            <CanvasContextProvider>
              <UploadContextProvider>
                <SaveContextProvider>
                  <ProtectedRoute>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ProtectedRoute>
                </SaveContextProvider>
              </UploadContextProvider>
            </CanvasContextProvider>
          </UserContextProvider>
        </SidebarContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  );
}
