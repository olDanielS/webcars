import {ReactNode} from 'react';
import { ToastContainer } from 'react-toastify';

export function Container({children}: {children: ReactNode}) {
 return (
   <div className='w-full max-w-7xl mx-auto px-4'>
    <ToastContainer/>
      {children}
   </div>
 );
}