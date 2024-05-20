import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Waypoints } from "lucide-react";

import { useNavigate } from 'react-router-dom';


export const Dashboard = ({usuario, socket, setListaUsuarios}) => {


  const navigate = useNavigate();
  const [sala, setSala] = useState('');

  const chats_globales = [
    { nombre: "General", descripcion: "¡Habla de todo lo que te apetezca!" },
    { nombre: "Juegos", descripcion: "Eres gamer? Esta es tu sala!" },
    { nombre: "Negocios", descripcion: "Quieres crear tu primer negocio?" }
  ];

  useEffect(() => {

    socket.emit("login", localStorage.getItem("usuario"));

  },[socket]);

  useEffect(() => {
      socket.emit("join_room", {
        user:localStorage.getItem("usuario"),
        room:sala
      });

  }, [sala]);

  const entrarSala = (e) => {
    console.log("hjola")
    const nombre = e.target.parentNode.querySelectorAll("p")[0];
    setSala(nombre.textContent.toLowerCase().trim());

    if(sala.toLowerCase().trim() === "general"){
      localStorage.setItem("sala", sala);
      navigate("/sala-general")
    }

    if(sala.toLowerCase().trim() === "juegos"){
      localStorage.setItem("sala", sala);
      navigate("/sala-juegos")
    }

    if(sala.toLowerCase().trim() === "negocios"){
      localStorage.setItem("sala", sala);
      navigate("/sala-negocios")
    }


  }

  return (
    <div className="">
      <section className="bg-gray-50">
        <div className="">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Chatea y Conoce gente!
              <strong className="font-extrabold text-white sm:block bg-orange-600 w-2/3 m-auto"> #BetterPlace</strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              <span className="text-white bg-orange-600 p-1 rounded font-bold">Chattik</span> es un lugar único para ser tu mismo, explora todas las áreas y diviértete!
            </p>

          </div>
        </div>
      </section>

      <span className="relative flex justify-center mt-11 mb-5">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
        ></div>

        <span className="relative z-10 bg-white px-6">Areas <span className="font-bold">#Chattik</span></span>
      </span>

      <div className="card mb-11">
        {chats_globales.map((chats,i) => (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 card-components" key={i}>
              <div className="p-5">
                  <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{chats.nombre}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{chats.descripcion}</p>
                  <a 
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => entrarSala(e)}>
                      Entrar
                      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
          </div>

        )) }
      </div>


      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">Crea tu comunidad</h2>

              <p className="mt-4 text-gray-600">
                No solamente tenemos servicios de chat, sino que además ofrecemos servicios como <span>crear tu comunidad</span> para la gente que quiera hacer grupo!
              </p>
              <a
                href="#"
                class="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                Crea tu comunidad
              </a>
            </div>
          </div>
        </div>
      </section>


      <figure className="max-w-screen-md mx-auto text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
          </svg>
          <blockquote>
              <p className="text-2xl italic font-medium text-gray-900 dark:text-black">"Como decía Einstein: Los elefantes son muy buenos en matemáticas porque tienen muchos dedos"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
              <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                  <cite className="pe-3 font-medium text-gray-900 dark:text-black">Sergio</cite>
                  <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">CEO at Chattik</cite>
              </div>
          </figcaption>
      </figure>



      
    </div>
  )
}
