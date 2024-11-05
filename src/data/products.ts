import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Aceite Sintético 5W-30',
    brand: 'Shell',
    type: 'oil',
    price: 8500,
    stock: 24,
    quality: 'standard',
    compatibility: ['Toyota Corolla', 'Honda Civic']
  },
  {
    id: '2',
    name: 'Aceite Sintético 5W-30 Premium',
    brand: 'Mobil 1',
    type: 'oil',
    price: 12000,
    stock: 15,
    quality: 'premium',
    compatibility: ['Toyota Corolla', 'Honda Civic']
  },
  {
    id: '3',
    name: 'Aceite Semi-Sintético 5W-30',
    brand: 'Castrol',
    type: 'oil',
    price: 6500,
    stock: 30,
    quality: 'economic',
    compatibility: ['Toyota Corolla', 'Honda Civic']
  },
  {
    id: '4',
    name: 'Filtro de Aceite Original',
    brand: 'Toyota',
    type: 'oilFilter',
    price: 3500,
    stock: 20,
    quality: 'premium',
    compatibility: ['Toyota Corolla']
  },
  {
    id: '5',
    name: 'Filtro de Aceite',
    brand: 'Mann',
    type: 'oilFilter',
    price: 2500,
    stock: 25,
    quality: 'standard',
    compatibility: ['Toyota Corolla']
  },
  {
    id: '6',
    name: 'Filtro de Aceite Económico',
    brand: 'Wega',
    type: 'oilFilter',
    price: 1800,
    stock: 30,
    quality: 'economic',
    compatibility: ['Toyota Corolla']
  }
];