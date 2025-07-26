import { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus } from '../../../api/mockApi';
import useAuth from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const { user, role } = useAuth();

    const loadOrders = async () => {
        setLoading(true);
        try {
            let allOrders = await fetchOrders();
            if (role === USER_ROLES.USER) {
                allOrders = allOrders.filter(order => order.userId === user.id);
            }
            setOrders(allOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [user.id, role]); // The dependency array ensures it re-fetches if the user changes, which is good practice.

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            loadOrders(); // Reload all orders to ensure data is fresh
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredOrders = orders.filter(order => filter === 'All' || order.status === filter);
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Confirmed': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const title = role === USER_ROLES.USER ? 'My Orders & Requests' : 'Manage All Orders & Requests';

    if (loading) return <div className="flex items-center justify-center h-full"><p>Loading orders...</p></div>;

    return (
        <div>
            <h2 className="text-3xl font-serif font-bold text-brand-text mb-6">{title}</h2>
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(status => (
                    <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${filter === status ? 'bg-brand-primary text-white shadow-md' : 'bg-brand-light hover:bg-gray-200'}`}>
                        {status}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-brand-light">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Status</th>
                            {role !== USER_ROLES.USER && <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredOrders.length > 0 ? filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{order.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.productName || order.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                {role !== USER_ROLES.USER && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                        {order.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleStatusChange(order.id, 'Confirmed')} className="text-green-600 hover:text-green-900 font-semibold">Confirm</button>
                                                <button onClick={() => handleStatusChange(order.id, 'Cancelled')} className="text-red-600 hover:text-red-900 font-semibold">Cancel</button>
                                            </>
                                        )}
                                        {order.status === 'Confirmed' && (
                                            <button onClick={() => handleStatusChange(order.id, 'Completed')} className="text-blue-600 hover:text-blue-900 font-semibold">Complete</button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        )) : (
                            <tr><td colSpan={role === USER_ROLES.USER ? 5 : 6} className="text-center py-10 text-gray-500">No orders found for this filter.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;