import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useNotification } from './NotificationContext';

interface UserContextValue {
  currentUser: User | null;
  isAuthenticated: boolean;
  handleGoogleSignIn: () => void;
  handleSignOut: () => void;
}

const UserContext = createContext<UserContextValue>({
  currentUser: null,
  isAuthenticated: false,
  handleGoogleSignIn: () => {},
  handleSignOut: () => {},
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenicated] = useState<boolean>(false);
  const router = useRouter();
  const { setNotification } = useNotification();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) =>
      setCurrentUser(user as User)
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (
      currentUser?.uid === 'kU5Nz9W9PiYf6QSCStgKtQzh9XV2' ||
      currentUser?.uid === '025MQhK3n7P1q61Tddnh9jJFP5k2'
    )
      setIsAuthenicated(true);
  }, [currentUser]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        setNotification({
          message: 'You are logged in as ' + auth.currentUser?.displayName,
          type: 'Success',
        });
      })
      .catch((error) => {
        setNotification({
          message: `${error.code} - ${error}`,
          type: 'Warning',
        });
      });
  };

  const handleSignOut = async () =>
    await signOut(auth).then(() => {
      router.push('/');
      setNotification({
        message: 'You are logged out',
        type: 'Success',
      });
      setTimeout(() => {
        // not the best practice but do for now in order to avoid showing the 403 page
        setCurrentUser(null);
        setIsAuthenicated(false);
      }, 2000);
    });

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        handleGoogleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
