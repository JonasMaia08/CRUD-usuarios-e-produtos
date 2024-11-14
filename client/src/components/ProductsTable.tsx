import React, { useState } from "react";
import { userProduct } from "./schemaProducts";

interface ProductTableProps {
    products: userProduct[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
    
    const [visibleItems, setVisibleItems] = useState(10);
    const loadMoreItems = () => {
        setVisibleItems((prev) => prev + 5);
    };

    return (
        <div className="mt-4">
            <table className="w-full border border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Nome</th>
                        <th className="border p-2">Descrição</th>
                        <th className="border p-2">Preço</th>
                        <th className="border p-2">Quantidade</th>
                        <th className="border p-2">Categoria</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.slice(0, visibleItems).map((product) => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.nome}</td>
                            <td className="border p-2">{product.descricao}</td>
                            <td className="border p-2">{product.preco}</td>
                            <td className="border p-2">{product.quantidade}</td>
                            <td className="border p-2">{product.categoria}</td>
                            <td className="border p-2">
                                <button onClick={() => onEdit(product.id!)} className="mr-2 text-blue-500">
                                    Edit
                                </button>
                                <button onClick={() => onDelete(product.id!)} className="text-red-500">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {visibleItems < products.length && (
                <button onClick={loadMoreItems} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Carregar mais
                </button>
            )}
        </div>
    );
};

export default ProductTable;
