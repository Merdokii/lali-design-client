import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { FaFileUpload, FaTimes } from 'react-icons/fa';

const ProductForm = ({ onSubmit, initialData = null }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialData || {
            name: '', description: '', types: [], price: '', rentalPrice: '', stock: ''
        }
    });

    // State to hold image previews (temporary URLs)
    const [imagePreviews, setImagePreviews] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // When initialData changes (i.e., when editing), reset the form and set image previews
        const defaultValues = initialData || { name: '', description: '', types: [], price: '', rentalPrice: '', stock: '' };
        reset(defaultValues);
        setImagePreviews(initialData?.imageUrls || []);
    }, [initialData, reset]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (imagePreviews.length + files.length > 5) {
            alert("You can upload a maximum of 5 images.");
            return;
        }
        // Create temporary URLs for previewing
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (indexToRemove) => {
        // Revoke the object URL to prevent memory leaks
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const onFormSubmit = (data) => {
        // This is the simulation part. We attach the temporary preview URLs to the data.
        // A real backend would receive the files and return permanent URLs.
        const finalData = { ...data, imageUrls: imagePreviews };
        onSubmit(finalData);
    };

    const PRODUCT_TYPES = ['sale', 'rent', 'tailoring'];

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Input label="Product Name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            
            {/* Image Uploader */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Images (up to 5)</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <div className="flex flex-wrap gap-4 mb-4">
                        {imagePreviews.map((src, index) => (
                            <div key={index} className="relative">
                                <img src={src} alt={`preview ${index}`} className="h-24 w-24 object-cover rounded-md"/>
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2">
                                    <FaTimes size={12}/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <Button type="button" variant="secondary" onClick={() => fileInputRef.current.click()}>
                        <FaFileUpload className="inline-block mr-2" />
                        {imagePreviews.length > 0 ? 'Add More Images' : 'Upload Images'}
                    </Button>
                    <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/webp"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea {...register('description')} className="w-full px-3 py-2 border rounded-lg" rows="3"></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Available For</label>
                <div className="flex space-x-4">
                    {PRODUCT_TYPES.map(type => (
                        <label key={type} className="flex items-center">
                            <input type="checkbox" value={type} {...register('types', { required: 'Select at least one type' })} className="h-4 w-4"/>
                            <span className="ml-2 text-sm capitalize">{type}</span>
                        </label>
                    ))}
                </div>
                {errors.types && <p className="text-red-500 text-sm mt-1">{errors.types.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input label="Price ($)" type="number" {...register('price', { valueAsNumber: true })} />
                <Input label="Rental Price ($/day)" type="number" {...register('rentalPrice', { valueAsNumber: true })} />
            </div>

            <Input label="Stock Quantity" type="number" {...register('stock', { required: 'Stock is required', valueAsNumber: true })} />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

            <Button type="submit" className="w-full mt-4">
                {initialData ? 'Update Product' : 'Create Product'}
            </Button>
        </form>
    );
};

export default ProductForm;