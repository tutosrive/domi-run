import { type AxiosResponse } from 'axios';
import Driver from '../models/Driver.model';
import ReturningService from '../models/ReturningService.model';
import api from '../interceptors/axiosInterceptors';

class DriverService {
  private readonly endpoint: string;
  private readonly URL: string;
  private readonly URL_API: string;

  constructor() {
    this.endpoint = 'drivers';
    this.URL_API = import.meta.env.VITE_URL_API;
    this.URL = `${this.URL_API}/${this.endpoint}`;
  }

  async get_all_driver(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver[]> = await api.get<Driver[]>(this.URL);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver> = await api.get<Driver>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async post_driver(driver: Driver): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver> = await api.post<Driver>(this.URL, driver);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_driver(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await api.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_driver(id: number, driver: Omit<Driver, id>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver> = await api.put<Driver>(`${this.URL}/${id}`, driver);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async send_driver_counter(id: number, data: { delta: number }): Promise<ReturningService> {
    try {
      const res = await api.put(`${this.URL}/${id}/counter`, data);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_driver_counter(): Promise<ReturningService> {
    try {
      const res: AxiosResponse<Array<Driver>> = await api.get<Array<Driver>>(`${this.URL_API}/stats/${this.endpoint}/counters`);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const driverService = new DriverService();
export default driverService;
