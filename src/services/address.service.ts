import axios, { type AxiosResponse } from 'axios';
import Address from '../models/Address.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

class AddressService {
  private readonly endpoint: string; // Endpoint to access to addresses
  private readonly URL: string; // Complete URL (URL_API + endpoint)
  private readonly config_axios; // Config to send it into axios requests
  constructor() {
    this.endpoint = 'addresses';
    this.URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
    this.config_axios = { headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`, Accept: 'application/json' } };
  }

  /**Get all data from addresses*/
  async get_all_address(): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Address[]> = await axios.get<Address[]>(this.URL, this.config_axios);
      return new ReturningService(req.status, req.data || []);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Get data for a specific address
   * @param id - Unique identifier to get data from the backend.
   */
  async get_data_by_id(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Address> = await axios.get<Address>(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(req.status, req.data ?? {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
  /**
   * Send data to the backend
   * @param address - The Address to send to the backend.
   */
  async post_address(address: Address): Promise<ReturningService> {
    try {
      const __config = { headers: { ['Content-Type']: 'application/json' } };
      // Set headers by default from config_headers
      Object.assign(__config.headers, this.config_axios.headers);
      const req: AxiosResponse<Address> = await axios.post<Address>(this.URL, address, __config);
      return new ReturningService(req.status, req.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Remove Address from backend
   * @param id - Unique identifier to find and remove the address from the backend.
   */
  async delete_address(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse = await axios.delete(`${this.URL}/${id}`);
      return new ReturningService(req.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  /**
   * Update Address data from the backend
   * @param id - Unique identifier to find and remove the address from the backend.
   */
  async update_address(id: number): Promise<ReturningService> {
    try {
      const req: AxiosResponse<Address> = await axios.put<Address>(`${this.URL}/${id}`);
      return new ReturningService(req.status, req.data || {});
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

const addressService = new AddressService();
export default addressService;
