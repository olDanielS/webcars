import {ReactNode, useContext} from 'react';
import { AuthContext } from '../contexts/auth';
import { Navigate } from 'react-router';

interface PrivateProps{
  children: ReactNode
}

export function Private({children}: PrivateProps){
  const {loadingAuth, signed} = useContext(AuthContext);

  console.log(signed)
  if(loadingAuth){
    return <div></div>
  }
  if(!signed){
  
    return <Navigate to="/login"/>
  }
  return children
  
}