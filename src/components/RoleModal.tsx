import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Role, Permission } from '../types';
import { useStore } from '../store';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: Role;
}

const availablePermissions: Permission[] = [
  'read',
  'write',
  'delete',
  'manage_users',
  'manage_roles',
];

export const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, role }) => {
  const { addRole, updateRole } = useStore();
  const [formData, setFormData] = useState<Partial<Role>>(
    role ?? {
      name: '',
      description: '',
      permissions: [],
    }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      updateRole({ ...role, ...formData } as Role);
    } else {
      addRole({
        ...formData,
        id: crypto.randomUUID(),
      } as Role);
    }
    onClose();
  };

  const togglePermission = (permission: Permission) => {
    const permissions = formData.permissions ?? [];
    if (permissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: permissions.filter((p) => p !== permission),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...permissions, permission],
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {role ? 'Edit Role' : 'Add New Role'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="space-y-2">
                {availablePermissions.map((permission) => (
                  <label
                    key={permission}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={formData.permissions?.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 mr-2"
                    />
                    {permission.replace('_', ' ').toUpperCase()}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {role ? 'Update' : 'Add'} Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};