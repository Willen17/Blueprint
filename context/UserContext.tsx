import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
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
  currentUser: any;
  handleGoogleSignIn: () => void;
  handleSignOut: () => void;
}

const UserContext = createContext<UserContextValue>({
  currentUser: undefined,
  handleGoogleSignIn: () => {},
  handleSignOut: () => {},
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

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
      setCurrentUser(undefined);
      // TODO: more actions
    });

  return (
    <UserContext.Provider
      value={{ currentUser, handleGoogleSignIn, handleSignOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
