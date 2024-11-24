import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { useStore } from './store';
import { Header } from './components/Header';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    roleId: '1',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    roleId: '2',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const mockRoles = [
  {
    id: '1',
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles'],
    description: 'Full system access',
  },
  {
    id: '2',
    name: 'Editor',
    permissions: ['read', 'write'],
    description: 'Can read and write content',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setUsers, setRoles } = useStore();

  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
    setRoles(mockRoles);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserList />;
      case 'roles':
        return <RoleList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 p-4 md:p-8 pt-20 transition-all duration-200">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;