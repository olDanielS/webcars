import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Logo from '../../assets/logo.svg';
import { Container } from '../../components/container';
import { Input } from '../../components/input'

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {auth} from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, updateProfile, signOut} from 'firebase/auth';
import { AuthContext } from '../../contexts/auth';

import { toast } from 'react-toastify';

const schema = z.object({
  name: z.string().nonempty("O campo de nome não pode estar vazio"),
  email: z.string().email("Insira um email válido").nonempty("O campo de email não pode estar vazio"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo de senha não pode estar vazio"),

});

type FormData = z.infer<typeof schema>;

export function SignUp() {
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });
  const { handleInfoUser } = useContext(AuthContext);

   useEffect(() => {
      async function handleLogout() {
        await signOut(auth);
      };
  
      handleLogout();
    }, []);

  async function onSubmit(data: FormData) {
    await createUserWithEmailAndPassword(auth, data.email, data.password).then(async (user) => {
      
      await updateProfile(user.user, {
        displayName: data.name
      })
      handleInfoUser({
        uid: user.user.uid,
        name: data.name,
        email: data.email
      })
      console.log("User created")
      navigate("/dashboard", {replace: true})

    }).catch((err) => {
      console.log("Erro ao criar usuário")
      if(err.code === "auth/email-already-in-use"){
        toast.error("Este email já está em uso")}
      else{
        toast.error("Ocorreu um erro ao criar o usuário")
      }
    })

  }
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
              type='text'
              placeholder='Digite seu nome completo'
              name="name"
              error={errors?.name?.message}
              register={register}
            />
          </div>
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
            Cadrastar
          </button>
        </form>

        <Link to={"/login"} className='text-zinc-900 font-medium'>
          Já tem uma conta? Acesse agora!
        </Link>
      </div>
    </Container>
  );
}