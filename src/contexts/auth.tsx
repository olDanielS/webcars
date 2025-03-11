import {ReactNode, useState, createContext, useEffect} from 'react';

import {auth} from '../services/firebaseConnection'
import { onAuthStateChanged} from 'firebase/auth';

interface AuthProviderProps{
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loading: boolean;
}

type UserProps = {
  uid: string,
  name?: string | null,
  email?: string | null
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email
        })
        setLoading(false);
      }else{
        setUser(null);
        setLoading(false);
      }
    })
    return () => {
      unsub();}
  }, [])

  return(
    <AuthContext.Provider 
    value={{signed: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;