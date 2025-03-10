import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router';
import Logo from '../../assets/logo.svg';
import { Container } from '../../components/container';
import { Input } from '../../components/input'

import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty("O campo de email não pode estar vazio"),
  password: z.string().nonempty("O campo de senha não pode estar vazio")
});

type FormData = z.infer<typeof schema>;

export function SignIn() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    };

    handleLogout();
  }, []);


async function onSubmit(data: FormData) {
  await signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user) => {
      console.log(user);
      navigate('/dashboard', { replace: true });
    }).catch((error) => {
      toast.error("Não foi possível fazer login, verifique suas credenciais");
      console.log(error);
    })
};
return (
  <Container>
    <div className='w-full min-h-screen flex items-center justify-center flex-col gap-4'>
      <Link to={"/"} className='mb-6 max-w-sm w-full'>
        <img src={Logo} alt="Logo do site" className='w-full' />
      </Link>
      <form className='bg-white max-w-xl w-full rounded-lg p-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-3'>
          <Input
            type='email'
            placeholder='Digite seu email'
            name="email"
            error={errors?.email?.message}
            register={register}
          />
        </div>
        <div className='mb-3'>
          <Input
            type='password'
            placeholder='Digite sua senha'
            name="password"
            error={errors?.password?.message}
            register={register}
          />
        </div>

        <button type='submit' className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium cursor-pointer'>
          Acessar
        </button>
      </form>

      <Link to={"/register"} className='text-zinc-900 font-medium m-0'>
        Ainda não tem uma conta? Crie uma agora
      </Link>
    </div>
  </Container>
);
}