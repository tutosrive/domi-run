import axios, { type AxiosResponse } from 'axios';
import Motorcycle from '../models/Motorcycle.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class MotorcycleService {
  private readonly endpoint: string; // Endpoint to access to motorcycles
  private readonly URL: string; // Complete URL (URL_API + endpoint)
  private readonly config_axios; // Config to send it into axios requests
  constructor() {
    this.endpoint = 'motorcycles';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
    this.token = sessionStorage.getItem('MS_TOKEN_CLIEND_DOMI_RUN');
    this.config_axios = { headers: { Authorization: `Bearer ${this.token}`, Accept: 'application/json' } };
  }

  /**Get all data from motorcycles*/
  async get_all_motorcycle(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Motorcycle[]> = await axios.get<Motorcycle[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Get data for a specific motorcycle
   * @param id - Unique identifier to get data from the backend.
   */
  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Motorcycle> = await axios.get<Motorcycle>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Send data to the backend
   * @param motorcycle - motorcycle The Motorcycle to send to the backend.
   */
  async post_motorcycle(motorcycle: Omit<Motorcycle, id>): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      // Set headers by default from config_headers
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Motorcycle> = await axios.post<Motorcycle>(this.URL, motorcycle, __config);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Remove Motorcycle from backend
   * @param id - Unique identifier to find and remove the motorcycle from the backend.
   */
  async delete_motorcycle(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Update Motorcycle data from the backend
   * @param id - Unique identifier to find and remove the motorcycle from the backend.
   * @param motorcycle - The Motorcycle Object to send.
   */
  async update_motorcycle(id: number, motorcycle: Omit<Motorcycle, id>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Motorcycle> = await axios.put<Motorcycle>(`${this.URL}/${id}`, motorcycle);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const motorcycleService = new MotorcycleService();
export default motorcycleService;
