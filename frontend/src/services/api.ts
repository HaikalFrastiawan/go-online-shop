import axios from "axios";

// Sesuaikan dengan port backend Go kamu (9000)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  images?: ProductImage[];
  created_at?: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Order {
  id?: number;
  user_id?: number;
  total_price: number;
  status?: string;
  items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface Payment {
  order_id: number;
  method: string;
  amount: number;
  status?: string;
}

export interface Address {
  id?: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

// Products
export const getProducts = () => api.get<Product[]>("/products");
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);

// Categories
export const getCategories = () => api.get<Category[]>("/categories");

// Orders
export const createOrder = (order: Order) => api.post("/orders", order);
export const createOrderItems = (items: OrderItem[]) => api.post("/order-items", items);

// Payments
export const createPayment = (payment: Payment) => api.post("/payments", payment);

// Auth
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export default api;
