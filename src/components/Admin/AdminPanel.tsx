import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminContent from './AdminContent';

const AdminPanel: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdmin();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-gray-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminDashboard>
      <AdminContent />
    </AdminDashboard>
  );
};

export default AdminPanel;
