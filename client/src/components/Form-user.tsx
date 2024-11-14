import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';
import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormMask } from "use-mask-input";
import { userRegisterSchema } from './schema';
import { userRegister } from './schema';

interface FormProps {
  onAddUser: (user: userRegister) => void;
  editingUser: userRegister | null; 
  setEditingUser: (user: userRegister | null) => void;
}


const Form: React.FC<FormProps> = ({ onAddUser , editingUser , setEditingUser  }) => {
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset, setValue, setError } = useForm<userRegister>({
    resolver: zodResolver(userRegisterSchema)
  });
  const registerWithMask = useHookFormMask(register);

  useEffect(() => {
    if (editingUser ) {
      setValue("nome", editingUser .nome);
      setValue("email", editingUser .email);
      setValue("telefone", editingUser .telefone);
      setValue("data_nascimento", editingUser .data_nascimento);
    } else {
      reset();
    }
  }, [editingUser , setValue, reset]);

  async function onSubmit(data: userRegister) {
    try {
      await onAddUser(data);
      setEditingUser(null);
      reset();
      console.log('Form submitted:', data);
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
  
        if (errorMessage === "E-mail já utilizado.") {
          setError("email", {
            type: "manual",
            message: errorMessage,
          });
        } else {
          console.log("Erro desconhecido:", errorMessage);
        }
      } else {
        console.log("Erro no servidor ou erro desconhecido:", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-4 rounded-lg">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm">Nome</label>
            <input type="text" id="nome" {...register('nome', { required: "Nome é obrigatório." })} className="p-2 border border-gray-300 rounded w-40" />
            {errors.nome && <p className="text-xs text-red-400 mt-1">{errors.nome.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">E-mail</label>
            <input type="text" id="email" {...register('email', { required: "E-mail é obrigatório." })} className="p-2 border border-gray-300 rounded w-40" />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefone" className="text-sm">Telefone</label>
            <input
              type="text"
              id="telefone"
              {...registerWithMask('telefone', '(99) 99999-9999')}
              className="p-2 border border-gray-300 rounded w-40"
            />
            {errors.telefone && <p className="text-xs text-red-400 mt-1">{errors.telefone.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="data_nascimento" className="text-sm">Data de Nascimento</label>
            <input
              type="text"
              id="data_nascimento"
              {...registerWithMask('data_nascimento', '99/99/9999')}
              className="p-2 border border-gray-300 rounded w-40"
            />
            {errors.data_nascimento && <p className="text-xs text -red-400 mt-1">{errors.data_nascimento.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center"
        >
          {isSubmitting ? <Loader className="animate-spin" /> : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}

export default Form;