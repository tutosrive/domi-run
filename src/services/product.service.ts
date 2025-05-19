import axios, { type AxiosResponse } from 'axios';
import Product from '../models/Product.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class ProductService {
  private readonly endpoint: string;
  private readonly URL: string;
  private readonly config_axios;

  constructor() {
    this.endpoint = 'products';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
    this.config_axios = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
  }

  async get_all_product(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product[]> = await axios.get<Product[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product> = await axios.get<Product>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async create_product(product: Omit<Product, 'id'>): Promise<ReturningService> {
    try {
      const res = await axios.post(`${this.URL}`, product, this.config_axios);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_product(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_product(id: number, product: Omit<Product, 'id'>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Product> = await axios.put<Product>(`${this.URL}/${id}`, product, this.config_axios);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const productService = new ProductService();
export default productService;
