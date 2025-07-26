import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/mockApi';
import Card from '../components/common/Card';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        // Filter for products available for sale
        const saleProducts = allProducts.filter(p => p.types.includes('sale'));
        setProducts(saleProducts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block relative">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-xl text-gray-300">Discovering cosmic treasures...</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 mb-4"
        >
          Celestial Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-gray-400"
        >
          Stellar pieces crafted from cosmic inspiration
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <Card product={product} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductsPage;