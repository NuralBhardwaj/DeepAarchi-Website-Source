import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import {
  LayoutDashboard,
  Image,
  Calendar,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react';

interface AdminDashboardProps {
  children: React.ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children }) => {
  const { user, logout } = useAdmin();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'artists', label: 'Artists', icon: Users },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/90 backdrop-blur-xl border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* User Info */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white capitalize">
              {activeSection}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">
              Welcome back, {user?.name.split(' ')[0]}
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {React.cloneElement(children as React.ReactElement<any>, { activeSection })}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
