export interface Product {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  stock: number;
  quality: 'economic' | 'standard' | 'premium';
  compatibility?: string[];
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  startDate: string;
  status: 'active' | 'inactive';
  specialties: string[];
  schedule: {
    start: string;
    end: string;
  };
  salary: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  type: 'full' | 'oil' | 'inspection';
  includes: string[];
}

export interface ServiceOrder {
  id: string;
  vehicle: Vehicle;
  service: Service;
  servicePackage: ServicePackage;
  status: 'pending' | 'in_progress' | 'completed' | 'billed';
  startTime?: string;
  endTime?: string;
  assignedEmployee?: Employee;
  notes?: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  total: number;
  employeeId: string;
  type: 'product' | 'service';
  vehicle?: Vehicle;
  paymentMethod: 'cash' | 'card' | 'transfer';
  discount?: number;
  serviceOrderId?: string;
  status: 'pending' | 'completed';
}

export interface SaleItem {
  id: string;
  productId?: string;
  serviceId?: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Vehicle {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  engineType?: string;
  oilType?: string;
}

export interface ServicePackage {
  type: 'economic' | 'standard' | 'premium';
  oil: Product;
  oilFilter: Product;
  airFilter?: Product;
  total: number;
}

export interface CashRegister {
  id: string;
  status: 'open' | 'closed';
  openedAt: string;
  closedAt?: string;
  initialAmount: number;
  currentAmount: number;
  transactions: CashTransaction[];
}

export interface CashTransaction {
  id: string;
  timestamp: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  paymentMethod: 'cash' | 'card' | 'transfer';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  paymentTerms: string;
  status: 'active' | 'inactive';
  lastOrderDate?: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  lastServiceDate: string;
  vehicle: Vehicle;
}