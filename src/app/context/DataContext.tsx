import { createContext, useContext, useState, ReactNode } from 'react';

export type Property = {
  id: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  squareMeters: number;
  hasKitchen: boolean;
  kitchenType?: string;
  price: number;
  address: string;
  description: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  status: 'active' | 'inactive';
};

export type Purchase = {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string;
  status: 'pending' | 'validated' | 'rejected';
  totalPrice: number;
};

type DataContextType = {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  purchases: Purchase[];
  addPurchase: (purchase: Omit<Purchase, 'id'>) => void;
  updatePurchaseStatus: (id: string, status: Purchase['status']) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      squareMeters: 150,
      hasKitchen: true,
      kitchenType: 'Moderna equipada',
      price: 250000,
      address: 'Av. Principal 123, Santiago',
      description: 'Hermosa casa con amplios espacios y excelente ubicación',
    },
    {
      id: '2',
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
      bedrooms: 4,
      bathrooms: 3,
      parking: 3,
      squareMeters: 220,
      hasKitchen: true,
      kitchenType: 'Cocina de lujo con isla',
      price: 380000,
      address: 'Los Cerezos 456, Las Condes',
      description: 'Casa espaciosa con jardín y piscina',
    },
    {
      id: '3',
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'],
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      squareMeters: 85,
      hasKitchen: true,
      kitchenType: 'Cocina americana',
      price: 150000,
      address: 'Pasaje Los Robles 789, Providencia',
      description: 'Departamento acogedor ideal para pareja',
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Admin User', email: 'admin@benjas.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Cliente 1', email: 'cliente@benjas.com', role: 'client', status: 'active' },
    { id: '3', name: 'Juan Pérez', email: 'juan@email.com', role: 'client', status: 'active' },
    { id: '4', name: 'María González', email: 'maria@email.com', role: 'client', status: 'inactive' },
  ]);

  const [purchases, setPurchases] = useState<Purchase[]>([
    {
      id: '1',
      propertyId: '1',
      userId: '2',
      userName: 'Cliente 1',
      userEmail: 'cliente@benjas.com',
      date: '2026-05-20',
      status: 'pending',
      totalPrice: 250000,
    },
    {
      id: '2',
      propertyId: '3',
      userId: '3',
      userName: 'Juan Pérez',
      userEmail: 'juan@email.com',
      date: '2026-05-15',
      status: 'validated',
      totalPrice: 150000,
    },
  ]);

  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = { ...property, id: Date.now().toString() };
    setProperties([...properties, newProperty]);
  };

  const updateProperty = (id: string, property: Partial<Property>) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...property } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: Date.now().toString() };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, user: Partial<User>) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...user } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addPurchase = (purchase: Omit<Purchase, 'id'>) => {
    const newPurchase = { ...purchase, id: Date.now().toString() };
    setPurchases([...purchases, newPurchase]);
  };

  const updatePurchaseStatus = (id: string, status: Purchase['status']) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <DataContext.Provider value={{
      properties,
      addProperty,
      updateProperty,
      deleteProperty,
      users,
      addUser,
      updateUser,
      deleteUser,
      purchases,
      addPurchase,
      updatePurchaseStatus,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
