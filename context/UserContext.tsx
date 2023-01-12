import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase/firebaseConfig';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) =>
      setCurrentUser(user as User)
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser?.uid === '9ZT8CTmPj1ZRZoYGPHGv7afPJix1')
      setIsAuthenicated(true);
  }, [currentUser]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode, error);
      });
  };

  const handleSignOut = async () =>
    await signOut(auth).then(() => {
      setCurrentUser(null);
      setIsAuthenicated(false);
      // TODO: more actions
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
