import { create } from 'zustand';
import { User, Role, Permission } from '../types';

interface Store {
  users: User[];
  roles: Role[];
  setUsers: (users: User[]) => void;
  setRoles: (roles: Role[]) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (role: Role) => void;
  deleteRole: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  users: [],
  roles: [],
  setUsers: (users) => set({ users }),
  setRoles: (roles) => set({ roles }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (role) =>
    set((state) => ({
      roles: state.roles.map((r) => (r.id === role.id ? role : r)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((r) => r.id !== id),
    })),
}));