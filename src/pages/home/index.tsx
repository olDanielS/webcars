import { Container } from "../../components/container";

export function Home() {
  return (
    <Container>
     <section className="bg-white mt-4 w-full p-4 rounded-lg max-w-3xl mx-auto flex gap-2">
      <input 
        className="w-full border-2 rounded-lg h-9 px-3 outline-none"
        placeholder="Digite o nome do carro"
      />
      <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg ">
        Buscar
      </button>
     </section>
     
     <h1 className="font-bold text-center mt-6 text=2xl mb-4">
      Carros novos e usados em todo Brasil
    </h1>

    <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      
        <section className="w-full bg-white rounded-lg">
          <img src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250308/toyota-corolla-2.0-vvtie-flex-xei-direct-shift-wmimagem21551866823.jpg?s=fill&w=552&h=414&q=60" 
          alt="Carro"
          className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all duration-300 cursor-pointer"
          />,
          <p className="font-bold mt-1 mb-2 px-2">TOYOTA COROLLA</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2016/2026 | 23.000km</span>
            <strong className="text-black font-medium text-xl">R$131.000</strong>
          </div>

          <div className="w-full h-px bg-gray-300 my-2"></div>

          <div className="px-2 pb-2">
            <span>Campo grande MS</span>
          </div>
        </section>

    </main>
    </Container>
  );
 }