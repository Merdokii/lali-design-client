import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import OwnerDashboard from '../../components/dashboard/OwnerDashboard';
import OrderList from '../../components/dashboard/management/OrderList';
import InventoryManagement from '../../components/dashboard/management/InventoryManagement';
import UserManagement from '../../components/dashboard/management/UserManagement';
import { FaTachometerAlt, FaClipboardList, FaBoxOpen, FaUsersCog, FaUser } from 'react-icons/fa';

const DashboardPage = () => {
  const { user, role } = useAuth();
  
  const getDefaultTab = () => {
    if (role === USER_ROLES.USER) return 'myOrders';
    return 'overview';
  };
  
  const [activeTab, setActiveTab] = useState(getDefaultTab());

  // THE FIX: Store the component TYPE, not an instance (<Component />)
  const TABS = {
    overview: {
      label: 'Overview',
      icon: FaTachometerAlt,
      component: OwnerDashboard, // Correct: Component type
      roles: [USER_ROLES.OWNER, USER_ROLES.EMPLOYEE],
    },
    orders: {
      label: 'Manage Orders',
      icon: FaClipboardList,
      component: OrderList, // Correct: Component type
      roles: [USER_ROLES.OWNER, USER_ROLES.EMPLOYEE],
    },
    inventory: {
      label: 'Inventory',
      icon: FaBoxOpen,
      component: InventoryManagement, // Correct: Component type
      roles: [USER_ROLES.OWNER, USER_ROLES.EMPLOYEE],
    },
    users: {
      label: 'Manage Users',
      icon: FaUsersCog,
      component: UserManagement, // Correct: Component type
      roles: [USER_ROLES.OWNER],
    },
    myOrders: {
      label: 'My Orders & Requests',
      icon: FaClipboardList,
      component: OrderList, // Correct: Component type
      roles: [USER_ROLES.USER],
    }
  };

  const availableTabs = Object.entries(TABS).filter(([, tab]) => tab.roles.includes(role));

  // THE FIX: Get the component type to be rendered
  const ActiveComponent = TABS[activeTab]?.component;
  
  const TabButton = ({ tabKey, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`flex items-center w-full px-4 py-3 text-lg text-left rounded-lg transition-all duration-300 ${
        activeTab === tabKey
          ? 'bg-brand-primary text-white shadow-lg'
          : 'text-brand-text hover:bg-brand-light hover:translate-x-2'
      }`}
    >
      <Icon className="mr-4 h-6 w-6" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto p-6 md:p-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-text mb-8">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            <aside className="md:w-1/4 lg:w-1/5">
                <div className="p-4 bg-brand-light rounded-lg shadow-md mb-6 flex items-center">
                    <FaUser className="text-brand-primary mr-3" size={20}/>
                    <div>
                        <p className="font-bold text-lg">{user.name}</p>
                        <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {availableTabs.map(([key, tab]) => (
                        <TabButton key={key} tabKey={key} icon={tab.icon} label={tab.label} />
                    ))}
                </div>
            </aside>

            <main className="flex-1 bg-white p-6 md:p-8 rounded-lg shadow-xl min-h-[50vh]">
                {/* THE FIX: Render the active component type here. This ensures it mounts correctly. */}
                {ActiveComponent ? <ActiveComponent /> : <div>Select a tab to get started.</div>}
            </main>
        </div>
    </div>
  );
};

export default DashboardPage;