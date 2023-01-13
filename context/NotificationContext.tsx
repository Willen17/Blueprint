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
  notification: Notification | undefined;
  setNotification: Dispatch<SetStateAction<Notification | undefined>>;
}

interface Notification {
  message: string;
  type: 'Warning' | 'Success' | 'Normal';
}

export const NotificationContext = createContext<NotificationContextValue>({
  notification: undefined,
  setNotification: () => undefined,
});

const NotificationContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | undefined>();

  console.log(notification);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
export const useNotification = () => useContext(NotificationContext);
