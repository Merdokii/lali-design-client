import { Link } from 'react-router-dom';

const Card = ({ product, index }) => {
  const coverImage = product.imageUrls?.[0] || 'https://via.placeholder.com/400';
  
  return (
    <Link 
        to={`/products/${product.id}`} 
        className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="overflow-hidden">
        <img src={coverImage} alt={product.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-serif font-semibold text-brand-text truncate">{product.name}</h3>
        <p className="text-lg font-medium text-brand-primary mt-2">
          {product.price ? `$${product.price}` : `$${product.rentalPrice}/day`}
        </p>
      </div>
    </Link>
  );
};

export default Card;