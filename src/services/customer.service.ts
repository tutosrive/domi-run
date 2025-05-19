import axios, { type AxiosResponse } from 'axios';
import Customer from '../models/Customer.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class CustomerService {
  private readonly endpoint: string;
  private readonly URL: string;
  private readonly URL_API: string;
  private readonly config_axios;

  constructor() {
    this.endpoint = 'customers';
    this.URL_API = import.meta.env.VITE_URL_API;
    this.URL = `${this.URL_API}/${this.endpoint}`;
    this.config_axios = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        Accept: 'application/json',
      },
    };
  }

  async get_all_customer(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer[]> = await axios.get<Customer[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer> = await axios.get<Customer>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async post_customer(customer: Customer): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Customer> = await axios.post<Customer>(this.URL, customer, __config);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_customer(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_customer(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Customer> = await axios.put<Customer>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  async get_history_customers_register(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<{ month: string; registrations: number }> = await axios.get<{ month: string; registrations: number }>(`${this.URL_API}/stats/${this.endpoint}/registration-history`, this.config_axios);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const customerService = new CustomerService();
export default customerService;
