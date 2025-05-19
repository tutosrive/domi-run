import axios, { type AxiosResponse } from 'axios';
import Order from '../models/Order.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class OrderService {
  private readonly endpoint: string; // Endpoint to access to orders
  private readonly URL: string; // Complete URL (URL_API + endpoint)
  private readonly config_axios; // Config to send it into axios requests
  private readonly URL_API: string;
  constructor() {
    this.endpoint = 'orders';
    this.URL_API = import.meta.env.VITE_URL_API;
    this.URL = `${this.URL_API}/${this.endpoint}`;
    this.token = sessionStorage.getItem('MS_TOKEN_CLIEND_DOMI_RUN');
    this.config_axios = { headers: { Authorization: `Bearer ${this.token}`, Accept: 'application/json' } };
  }

  /**Get all data from orders */
  async get_all_order(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Order[]> = await axios.get<Order[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data ?? []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Get data for a specific order
   * @param id - Unique identifier to get data from the backend.
   */
  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Order> = await axios.get<Order>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Send data to the backend
   * @param order - The Order to send to the backend.
   */
  async post_order(order: Omit<Order, id>): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      // Set headers by default from config_headers
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Order> = await axios.post<Order>(this.URL, order, __config);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Remove Order from backend
   * @param id - Unique identifier to find and remove the order from the backend.
   */
  async delete_order(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Update Order data from the backend
   * @param id - Unique identifier to find and remove the order from the backend.
   * @param order - The Order to send to the backend.
   */
  async update_order(id: number, order: Omit<Order, id>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Order> = await axios.put<Order>(`${this.URL}/${id}`, order);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  async get_order_month_most_wanted(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Order> = await axios.get<Order>(`${this.URL_API}/stats/${this.endpoint}/months`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  async create_order(data: {
  customer_id: number;
  menu_id: number;
  motorcycle_id: number;
  quantity: number;
  total_price: number;
  status: string;
}): Promise<ReturningService> {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.config_axios.headers,
      },
    };
    const res: AxiosResponse<Order> = await axios.post(this.URL, data, config);
    return new ReturningService(res.status, res.data);
  } catch (e) {
    return new ReturningService(500, {}, e);
  }
}
}

const orderService = new OrderService();
export default orderService;
