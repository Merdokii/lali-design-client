import { useState, useEffect } from 'react';
import { fetchAllUsers, updateUser } from '../../../api/mockApi';
import { USER_ROLES } from '../../../utils/constants';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        setLoading(true);
        try {
            setUsers(await fetchAllUsers());
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUser(userId, { role: newRole });
            loadUsers(); // Refresh list to confirm change
        } catch (error) {
            alert('Failed to update user role');
        }
    };

    if (loading) return <div>Loading user data...</div>;

    return (
        <div>
            <h2 className="text-3xl font-serif font-bold text-brand-text mb-6">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-brand-light">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-brand-secondary uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {user.role !== USER_ROLES.OWNER ? (
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm rounded-md"
                                        >
                                            <option value={USER_ROLES.USER}>User</option>
                                            <option value={USER_ROLES.EMPLOYEE}>Employee</option>
                                        </select>
                                    ) : (
                                        <span className="text-xs text-gray-500">Owner role cannot be changed.</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;