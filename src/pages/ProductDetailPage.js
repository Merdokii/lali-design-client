import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, fetchRentalsForProduct, createOrder } from '../api/mockApi';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt, FaRulerHorizontal, FaShoppingCart } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductById(id);
        setProduct(productData);

        if (productData.imageUrls && productData.imageUrls.length > 0) {
            setMainImage(productData.imageUrls[0]);
        }
        if (productData.types.includes('rent')) {
          const rentalData = await fetchRentalsForProduct(id);
          // Correctly map and flatten the dates
          const dates = rentalData.flatMap(rental => {
            const dateArr = [];
            let currentDate = new Date(rental.startDate);
            // Adjust for timezone issues by working with UTC dates
            currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset());
            const stopDate = new Date(rental.endDate);
            stopDate.setMinutes(stopDate.getMinutes() + stopDate.getTimezoneOffset());
            
            while (currentDate <= stopDate) {
              dateArr.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return dateArr;
          });
          setUnavailableDates(dates);
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  
  // THIS IS THE FULLY RESTORED FUNCTION
  const handleAction = async (type) => {
    // 1. Check for authentication
    if (!isAuthenticated) {
        // Redirect to login but remember where the user was
        navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
        return;
    }

    // 2. Prepare order data
    let orderData = {
        userId: user.id,
        productId: product.id,
        type: type,
        productName: product.name, // Add product name for better display in dashboard
        description: `Request for ${product.name}`
    };

    // 3. Add rental-specific data if needed
    if (type === 'rent') {
        if (!startDate || !endDate) {
            alert('Please select a start and end date for the rental.');
            return;
        }
        // Format dates consistently
        orderData.startDate = startDate.toISOString().split('T')[0];
        orderData.endDate = endDate.toISOString().split('T')[0];
        orderData.totalPrice = product.rentalPrice * ((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
    }
    
    if (type === 'sale') {
        orderData.totalPrice = product.price;
    }

    // 4. Call the API and handle the response
    try {
        setLoading(true); // Give user feedback that something is happening
        await createOrder(orderData);
        alert(`Your ${type} request has been submitted successfully! Check your dashboard for updates.`);
        navigate('/dashboard'); // Navigate to dashboard to see the new order
    } catch (err) {
        alert(`Failed to submit request: ${err}`);
        console.error("Order submission error:", err);
    } finally {
        setLoading(false);
    }
  };

  if (loading && !product) return <div className="text-center p-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center p-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center p-20">Product not found.</div>;

  return (
    <div className="container mx-auto p-6 md:p-12 animate-fade-in-up">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 p-4">
          <div className="mb-4">
            <img src={mainImage || 'https://via.placeholder.com/600'} alt="Main product view" className="w-full h-[70vh] object-cover rounded-lg shadow-md"/>
          </div>
          <div className="flex space-x-2 overflow-x-auto p-2">
            {product.imageUrls?.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(url)}
                className={`h-24 w-24 object-cover rounded-md cursor-pointer border-2 transition-all ${mainImage === url ? 'border-brand-primary scale-110' : 'border-transparent'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-text">{product.name}</h1>
            <div className="flex space-x-2 my-4">
                {product.types.map(type => (
                    <span key={type} className="text-sm bg-brand-light text-brand-secondary px-3 py-1 rounded-full capitalize font-medium">{type}</span>
                ))}
            </div>
            <p className="text-gray-600 mt-4 flex-grow text-lg">{product.description}</p>
            <div className="mt-4"><span className="text-md font-semibold text-gray-500">Stock: {product.stock}</span></div>

            <div className="mt-8 border-t pt-8 space-y-6">
                {product.types.includes('sale') && (
                    <div className="p-4 bg-brand-light rounded-lg">
                        <h2 className="text-xl font-serif flex items-center"><FaShoppingCart className="mr-3 text-brand-primary"/> Buy This Item</h2>
                        <p className="text-3xl font-bold my-2 text-brand-text">${product.price}</p>
                        <Button onClick={() => handleAction('sale')} className="w-full mt-2">Add to Cart</Button>
                    </div>
                )}
                {product.types.includes('rent') && (
                    <div className="p-4 bg-brand-light rounded-lg">
                        <h2 className="text-xl font-serif flex items-center"><FaCalendarAlt className="mr-3 text-brand-primary"/> Rent This Item</h2>
                        <p className="text-3xl font-bold my-2 text-brand-text">${product.rentalPrice} <span className="text-lg font-normal">/ day</span></p>
                        <div className="flex justify-center mt-2">
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                excludeDates={unavailableDates}
                                minDate={new Date()}
                                selectsRange
                                inline
                            />
                        </div>
                        <Button onClick={() => handleAction('rent')} className="w-full mt-4" disabled={!startDate || !endDate}>Request to Rent</Button>
                    </div>
                )}
                {product.types.includes('tailoring') && (
                    <div className="p-4 bg-brand-light rounded-lg">
                        <h2 className="text-xl font-serif flex items-center"><FaRulerHorizontal className="mr-3 text-brand-primary"/> Request Tailoring</h2>
                        <p className="text-gray-600 my-2">Need this item altered? Contact us for a quote.</p>
                        <Button onClick={() => handleAction('tailoring')} className="w-full mt-2">Request Tailoring Service</Button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;