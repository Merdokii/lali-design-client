import { useState, useEffect } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../../api/mockApi';
import Modal from '../../common/Modal';
import ProductForm from './ProductForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from '../../common/Button';

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleOpenModal = (product = null) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmitForm = async (data) => {
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data);
            } else {
                await createProduct(data);
            }
            handleCloseModal();
            loadProducts(); // Refresh the list
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Error saving product. Please try again.');
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
            try {
                await deleteProduct(productId);
                loadProducts();
            } catch (error) {
                console.error('Failed to delete product:', error);
                alert('Error deleting product. Please try again.');
            }
        }
    };

    if (loading) return <div>Loading inventory...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Inventory Management</h2>
                <Button onClick={() => handleOpenModal()}>Add New Product</Button>
            </div>

            {/* New Card-Based Layout */}
            <div className="space-y-4">
                {products.map(product => {
                    // Correctly get the first image URL or provide a placeholder
                    const imageUrl = product.imageUrls && product.imageUrls.length > 0
                        ? product.imageUrls[0]
                        : 'https://via.placeholder.com/150';

                    return (
                        <div key={product.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-20 h-20 object-cover rounded-md mr-6" // Larger, rectangular image
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                                <div className="flex space-x-2 mt-1">
                                    {product.types.map(type => (
                                        <span key={type} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full capitalize">{type}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => handleOpenModal(product)} className="text-gray-500 hover:text-indigo-600 p-2 rounded-full transition-colors">
                                    <FaEdit size={18} />
                                </button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
            >
                <ProductForm onSubmit={handleSubmitForm} initialData={editingProduct} />
            </Modal>
        </div>
    );
    // The logic for this component remains the same. The UI improvements below will make it look much better.
// We will simply replace the render part of the component.
const InventoryManagement = () => {
    // ... All existing state and handler functions remain the same ...

    if (loading) return <div>Loading inventory...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="font-heading text-3xl font-bold text-brand-primary">Inventory</h2>
                <Button variant="primary" onClick={() => handleOpenModal()}>Add New Product</Button>
            </div>

            <div className="space-y-4">
                {products.map(product => {
                    const imageUrl = product.imageUrls?.[0] || 'https://via.placeholder.com/150';
                    return (
                        <div key={product.id} className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-brand-primary transition-all">
                            <img src={imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold font-heading text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-500">Stock: <span className="font-semibold">{product.stock}</span></p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleOpenModal(product)} className="text-gray-500 hover:text-indigo-600 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                                    <FaEdit size={18} />
                                </button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="text-gray-500 hover:text-red-600 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal /* ... modal component remains the same */ >
                <ProductForm /* ... form component remains the same */ />
            </Modal>
        </div>
    );
};
};

export default InventoryManagement;