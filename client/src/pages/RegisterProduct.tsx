import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "../components/Form-product";
import ProductTable from "../components/ProductsTable";
import { userProduct } from "../components/schemaProducts";
import useNavigateTo from "../components/useNavigateTo";

const Cadastrar = () => {
    const [products, setProducts] = useState<userProduct[]>([]);
    const [editingProduct, setEditingProduct] = useState<userProduct | null>(null);
    const GoTo = useNavigateTo();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8800/');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error("Error fetching products");
        }
    };

    const handleEdit = (id: number) => {
        const productToEdit = products.find(product => product.id === id);
        if (productToEdit) {
            console.log("Editing product:", productToEdit); // Debugging line
            setEditingProduct(productToEdit);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8800/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting product');
            }

            setProducts(products.filter(product => product.id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Error deleting product");
        }
    };

    const addOrUpdateProduct = async (product: userProduct) => {
        try {
            const method = editingProduct ? 'PUT' : 'POST';
            const url = editingProduct ? `http://localhost:8800/${editingProduct.id}` : 'http://localhost:8800/';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
    
            if (!response.ok) {
                throw new Error(editingProduct ? 'Error updating product' : 'Error adding product');
            }
    
            toast.success(editingProduct ? "Product updated successfully" : "Product added successfully");
            setEditingProduct(null); // Reset editing state
            fetchProducts(); // Refresh product list
        } catch (error) {
            toast.error(editingProduct ? "Error updating product" : "Error adding product");
        }
    };

    return (
        <>
            <header>
                <button
                    onClick={() => GoTo("/")}
                    className="h-12 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 flex items-center justify-center">
                    Voltar
                </button>
            </header>
            <div>
                <Form 
                    onAddProduct={addOrUpdateProduct} 
                    editingProduct={editingProduct} 
                    setEditingProduct={setEditingProduct} 
                />
                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
};

export default Cadastrar;