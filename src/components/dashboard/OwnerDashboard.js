import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../../api/mockApi';
import SalesChart from './SalesChart';
import { FaDollarSign, FaReceipt, FaPlusCircle, FaCut } from 'react-icons/fa';

// THIS IS THE CORRECTED COMPONENT TO MATCH THE IMAGE
const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-brand-light p-5 rounded-xl shadow-md flex items-center transition-all hover:shadow-lg hover:-translate-y-1">
        <div className={`p-4 rounded-full mr-4 ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <div>
            {/* The key changes are the text size and line-height of the title */}
            <p className="text-sm text-gray-500 font-medium leading-tight">{title}</p>
            <p className="text-3xl font-bold text-brand-text">{value}</p>
        </div>
    </div>
);


const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full"><p>Loading business overview...</p></div>;
  if (!data) return <div className="flex items-center justify-center h-full"><p>Could not load dashboard data.</p></div>;

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-brand-text mb-6">Business Overview</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Using colors that more closely match the vibrant screenshot */}
        <StatCard icon={FaDollarSign} title="Total Sales" value={`$${data.totalSales.toLocaleString()}`} color="bg-green-500" />
        <StatCard icon={FaReceipt} title="Total Rentals" value={`$${data.totalRentals.toLocaleString()}`} color="bg-blue-500" />
        <StatCard icon={FaPlusCircle} title="New Orders" value={data.newOrders} color="bg-yellow-500" />
        <StatCard icon={FaCut} title="Pending Tailoring" value={data.pendingTailoring} color="bg-pink-500" />
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-serif font-semibold mb-4">Monthly Performance</h3>
        <div className="p-4 bg-brand-light rounded-lg shadow-md h-96">
            <SalesChart chartData={data.chartData} />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;