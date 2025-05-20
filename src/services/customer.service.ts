import { type AxiosResponse } from 'axios';
import Customer from '../models/Customer.model.ts';
import ReturningService from '../models/ReturningService.model.ts';
import api from '../interceptors/axiosInterceptors.ts';
class CustomerService {
  private readonly endpoint: string;
  private readonly URL: string;
  private readonly URL_API: string;

  constructor() {
    this.endpoint = 'customers';
    this.URL_API = import.meta.env.VITE_URL_API;
    this.URL = `${this.URL_API}/${this.endpoint}`;
  }

  async get_all_customer(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer[]> = await api.get<Customer[]>(this.URL);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer> = await api.get<Customer>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async post_customer(customer: Customer): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer> = await api.post<Customer>(this.URL, customer, {
        headers: { 'Content-Type': 'application/json' },
      });
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_customer(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await api.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_customer(id: number, customer: Omit<Customer, id>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer> = await api.put<Customer>(`${this.URL}/${id}`, customer);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_history_customers_register(): Promise<ReturningService> {
    try {
      // Data from mock server
      const req: AxiosResponse<{ month: string; registrations: number }> = await api.get('http://localhost:4000/userRegistrations');
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const customerService = new CustomerService();
export default customerService;
