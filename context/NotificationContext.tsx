import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface NotificationContextValue {
  isLoading: IsLoading;
  setIsLoading: Dispatch<SetStateAction<IsLoading>>;
  notification: Notification | undefined;
  setNotification: Dispatch<SetStateAction<Notification | undefined>>;
}

interface IsLoading {
  isLoading: boolean;
  message?: string;
}
interface Notification {
  message: string;
  type: 'Warning' | 'Success' | 'Normal';
}

export const NotificationContext = createContext<NotificationContextValue>({
  isLoading: { isLoading: false },
  setIsLoading: () => {},
  notification: undefined,
  setNotification: () => undefined,
});

const NotificationContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<IsLoading>({ isLoading: false });
  const [notification, setNotification] = useState<Notification | undefined>();

  console.log(isLoading);

  return (
    <NotificationContext.Provider
      value={{ isLoading, setIsLoading, notification, setNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
export const useNotification = () => useContext(NotificationContext);
