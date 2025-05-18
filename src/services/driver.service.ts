import axios, { type AxiosResponse } from 'axios';
import Driver from '../models/Driver.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class DriverService {
  private readonly endpoint: string;
  private readonly URL: string;
  private readonly config_axios;

  constructor() {
    this.endpoint = 'drivers';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
    this.config_axios = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        Accept: 'application/json'
      }
    };
  }

  async get_all_driver(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver[]> = await axios.get<Driver[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver> = await axios.get<Driver>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async post_driver(driver: Driver): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Driver> = await axios.post<Driver>(this.URL, driver, __config);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete_driver(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update_driver(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Driver> = await axios.put<Driver>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const driverService = new DriverService();
export default driverService;
