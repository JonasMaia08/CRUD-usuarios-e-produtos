import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userProductSchema } from './schemaProducts';
import { userProduct } from './schemaProducts';

interface FormProps {
  onAddProduct: (newProduct: userProduct) => void;
  editingProduct: userProduct | null; // For editing
  setEditingProduct: (product: userProduct | null) => void;
}

const Form: React.FC<FormProps> = ({ onAddProduct, editingProduct, setEditingProduct }) => {
  const { register, handleSubmit, formState: { isSubmitting, errors }, reset, setValue } = useForm<userProduct>({
    resolver: zodResolver(userProductSchema),
  });

  useEffect(() => {
    if (editingProduct) {
    
      setValue("nome", editingProduct.nome);
      setValue("descricao", editingProduct.descricao);
      setValue("preco", editingProduct.preco);
      setValue("quantidade", editingProduct.quantidade);
      setValue("categoria", editingProduct.categoria);
    } else {
      reset(); 
    }
  }, [editingProduct, setValue, reset]);

  async function onSubmit(data: userProduct) {
    await onAddProduct(data);
    setEditingProduct(null);
    reset(); 
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shadow-lg p-4 rounded-lg">
      <div className="flex justify-between items-center space-x-4">
        <div className="flex space-x-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-sm">Nome</label>
            <input type="text" id="nome" {...register('nome')} className="p-2 border border-gray-300 rounded w-40" />
            {errors.nome && <p className="text-xs text-red-400 mt-1">{errors.nome.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="descricao" className="text-sm">Descrição</label>
            <input type="text" id="descricao" {...register('descricao')} className="p-2 border border-gray-300 rounded w-40" />
            {errors.descricao && <p className="text-xs text-red-400 mt-1">{errors.descricao.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="preco" className="text-sm">Preço</label>
            <input
              type="number"
              id="preco"
              {...register('preco')}
              step="0.01"
              className="p-2 border border-gray-300 rounded w-40"
            />
            {errors.preco && <p className="text-xs text-red-400 mt-1">{errors.preco.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantidade" className="text-sm">Quantidade</label>
            <input
              type="number"
              id="quantidade"
              {...register('quantidade', { valueAsNumber: true })}
              className="p-2 border border-gray-300 rounded w-40"
            />
            {errors.quantidade && <p className="text-xs text-red-400 mt-1">{errors.quantidade.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="categoria" className="text-sm">Categoria</label>
            <input type="text"
              id="categoria"
              {...register('categoria')}
              className="p-2 border border-gray-300 rounded w-40"
            />
            {errors.categoria && <p className="text-xs text-red-400 mt-1">{errors.categoria.message}</p>}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white p-2 rounded">
          {isSubmitting ? <Loader size={16} /> : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default Form;