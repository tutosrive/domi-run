import axios, { type AxiosResponse } from 'axios';
import Restaurant from '../models/Restaurant.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class RestaurantService {
  private readonly endpoint: string; // Endpoint to access to restaurants
  private readonly URL: string; // Complete URL (URL_API + endpoint)
  private readonly config_axios; // Config to send it into axios requests
  constructor() {
    this.endpoint = 'restaurants';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
    this.config_axios = { headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`, Accept: 'application/json' } };
  }

  /**Get all data from restaurants */
  async get_all_restaurant(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Restaurant[]> = await axios.get<Restaurant[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Get data for a specific restaurant
   * @param id - Unique identifier to get data from the backend.
   */
  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Restaurant> = await axios.get<Restaurant>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Send data to the backend
   * @param restaurant - The Restaurant to send to the backend.
   */
  async post_restaurant(restaurant: Omit<Restaurant, id>): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      // Set headers by default from config_headers
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Restaurant> = await axios.post<Restaurant>(this.URL, restaurant, __config);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Remove Restaurant from backend
   * @param id - Unique identifier to find and remove the restaurant from the backend.
   */
  async delete_restaurant(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Update Restaurant data from the backend
   * @param id - Unique identifier to find and remove the restaurant from the backend.
   * @param restaurant - The Restaurant to send to the backend.
   */
  async update_restaurant(id: number, restaurant: Omit<Restaurant, id>): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Restaurant> = await axios.put<Restaurant>(`${this.URL}/${id}`, restaurant);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const restaurantService = new RestaurantService();
export default restaurantService;
