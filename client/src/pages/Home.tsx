import React from 'react';
import useNavigateTo from "../components/useNavigateTo";


// const de colocar imagem
const icon = () => <span className="text-4xl"><img src="" alt="icon" className="w- h- md:w- md:h- object-contain" /></span>;

const ProfileSelect = () => {
  const GoTo = useNavigateTo();

  return (
    <>
      <div className="relative min-h-screen ">
        <main className="flex flex-col items-center justify- min-h-screen p-4">

          <div className="text-center mb-10 mt-12">

            <h2 className="text-3xl text-black mb-2">Selecione o cadastro que gostaria de realizar</h2>

          </div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-10 items-center">

            <div className="flex flex-col items-center ">
              <button
                onClick={() => GoTo("/user-register")}
                className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center">
                Gerir usuários
              </button>

            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => GoTo("/product-register")}
                className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center">
                Gerir produtos
              </button>
            </div>


          </div>

        </main>
      </div>

    </>

  );
};
export default ProfileSelect;
