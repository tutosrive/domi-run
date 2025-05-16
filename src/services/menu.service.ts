import axios, { type AxiosResponse } from 'axios';
import Menu from '../models/Menu.model';
import ReturningService from '../models/ReturningService.model';

class MenuService {
  private readonly endpoint = 'menus';
  private readonly URL = `${import.meta.env.VITE_URL_API}/${this.endpoint}`;
  private readonly config_axios;

  constructor() {
    const token = localStorage.getItem('token');
    this.config_axios = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
  }

  async get_all(): Promise<ReturningService> {
    try {
      const res: AxiosResponse<Menu[]> = await axios.get(this.URL, this.config_axios);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async get_by_id(id: number): Promise<ReturningService> {
    try {
      const res: AxiosResponse<Menu> = await axios.get(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async create(data: Omit<Menu, 'id'>): Promise<ReturningService> {
    try {
      const config = { headers: { 'Content-Type': 'application/json', ...this.config_axios.headers } };
      const res: AxiosResponse<Menu> = await axios.post(this.URL, data, config);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async update(id: number, data: Omit<Menu, 'id'>): Promise<ReturningService> {
    try {
      const res: AxiosResponse<Menu> = await axios.put(`${this.URL}/${id}`, data, this.config_axios);
      return new ReturningService(res.status, res.data);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }

  async delete(id: number): Promise<ReturningService> {
    try {
      const res: AxiosResponse = await axios.delete(`${this.URL}/${id}`, this.config_axios);
      return new ReturningService(res.status);
    } catch (e) {
      return new ReturningService(500, {}, e);
    }
  }
}

export default new MenuService();
