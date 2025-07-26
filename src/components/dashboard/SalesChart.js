import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ chartData }) => {
    const dataForChart = chartData.labels.map((label, index) => ({
        month: label,
        Sales: chartData.sales[index],
        Rentals: chartData.rentals[index],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={dataForChart}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-md !shadow-lg" />
                <Legend />
                {/* Updated colors to match the new theme */}
                <Bar dataKey="Sales" fill="#E07A5F" />
                <Bar dataKey="Rentals" fill="#3D405B" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;