import {Link} from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';

export function DashboardHeader() {
  
  async function handleLogOut(){
    await signOut(auth);
  }

 return (
   <div className='flex items-center w-full bg-red-500 h-10 gap-4 rounded-lg px-4 font-medium text-white mb-4'>
    <Link to="/dashboard">
      Dashboard
    </Link>
    <Link to="/dashboard/new">
    Cadastrar carro
    </Link>
  

    <button onClick={handleLogOut} className='ml-auto'>
      Sair da conta
    </button>
   </div>
 );
}