import React from 'react';
import { Users, Shield, Layout } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
  ];

  return (
    <div
      className={clsx(
        'bg-gray-900 text-white fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out',
        {
          '-translate-x-full md:translate-x-0': !isOpen,
          'translate-x-0': isOpen,
        }
      )}
    >
      <div className="w-64 flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <h1 className="text-2xl font-bold tracking-wider">RBAC Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors',
                  {
                    'bg-blue-600 text-white': activeTab === item.id,
                    'text-gray-300 hover:bg-gray-800': activeTab !== item.id,
                  }
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 bg-gray-800">
          <div className="text-sm text-gray-400">
            <p>Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};