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
  const { setNotification, setIsLoading } = useNotification();

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

  /* Handles sign in via google */
  const handleGoogleSignIn = async () => {
    setIsLoading({
      isLoading: true,
      message: 'Please sign in via the pop-up window',
    });
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {
        setNotification({
          message: 'You are logged in as ' + auth.currentUser?.displayName,
          type: 'Success',
        });
        setIsLoading({ isLoading: false });
        router.push('/canvas');
      })
      .catch((error) => {
        setNotification({
          message: `${error.code} - ${error}`,
          type: 'Warning',
        });
        setIsLoading({ isLoading: false });
      });
  };

  /* Handles sign out */
  const handleSignOut = async () => {
    setIsLoading({ isLoading: true });
    await signOut(auth).then(() => {
      setCurrentUser(null);
      setIsAuthenicated(false);
      router.push('/');
      setNotification({
        message: 'You are logged out',
        type: 'Success',
      });
    });
    setTimeout(() => setIsLoading({ isLoading: false }), 1000);
  };

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
