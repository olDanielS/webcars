import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelHeader";
import { FiUpload } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../components/input";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  model: z.string().nonempty("O modelo é obrigatório"),
  year: z.string().nonempty("O ano do carro é obrigatório"),
  km: z.string().nonempty("O KM do carro é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z.string().min(1, "O número de whatsapp é obrigatório").refine((value) => /^(\d{10,11})$/.test(value), {
      message: "Número de whatsapp inválido"
  }),
  description: z.string().nonempty("A descrição é obrigatória")
})

type FormData = z.infer<typeof schema>;

export function NewCar() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-60 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input type="file" accept="image/*" className="opacity-0 cursor-pointer" />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Onix 1.0"
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="EX: 2.0 FLEX PLUS MANUAL"
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">

            <div className="w-full ">
              <p className="mb-2 font-medium">Ano do carro</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2026/2026"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">KM do carro</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="EX: 100 KM"
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full ">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 73999999999"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade do carro</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="EX: São Paulo"
              />
            </div>
          </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Preço do carro</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="EX: R$ 50.000,00"
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Descrição</p>
              <textarea
                className="w-full border-2 rounded-md h-24 px-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite a descrição completa sobre o carro..."
                />
                {errors.description && <p className='my-1 text-red-500'>{errors.description.message}</p>}
            </div>
      
        <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">
          Cadastrar
        </button>
        </form>
      </div>
    </Container>

  );
}