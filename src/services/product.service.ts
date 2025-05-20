import { type AxiosResponse } from 'axios';
import Product from '../models/Product.model.ts';
import ReturningService from '../models/ReturningService.model.ts';
import api from '../interceptors/axiosInterceptors.ts'; 

class ProductService {
  private readonly endpoint: string;
  private readonly URL: string;

  constructor() {
    this.endpoint = 'products';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
  }

  async get_all_product(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product[]> = await api.get<Product[]>(this.URL);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product> = await api.get<Product>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async create_product(product: Omit<Product, 'id'>): Promise<ReturningService> {
    try {
      const res = await api.post(`${this.URL}`, product);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_product(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await api.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_product(id: number, product: Omit<Product, 'id'>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product> = await api.put<Product>(`${this.URL}/${id}`, product);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const productService = new ProductService();
export default productService;
