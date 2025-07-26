import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/mockApi';
import Card from '../components/common/Card';

const RentalsPage = () => {
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRentalItems = async () => {
      try {
        const allProducts = await fetchProducts();
        const rentals = allProducts.filter(p => p.types.includes('rent'));
        setRentalItems(rentals);
      } catch (error) {
        console.error("Failed to fetch rental items", error);
      } finally {
        setLoading(false);
      }
    };
    getRentalItems();
  }, []);

  if (loading) return <p className="text-center py-20">Loading our rental collection...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-serif font-bold text-brand-text">Rent an Outfit</h1>
            <p className="text-lg text-gray-600 mt-2">Stunning looks for every occasion, available for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rentalItems.length > 0 ? (
            rentalItems.map((product, index) => (
                <Card key={product.id} product={product} index={index} />
            ))
            ) : (
            <p>No rental items available at the moment.</p>
            )}
        </div>
    </div>
  );
};

export default RentalsPage;