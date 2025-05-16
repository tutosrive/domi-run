import axios from 'axios';
import Photo from '../models/Photo.model.ts';
import ReturningService from '../models/ReturningService.model.ts';

const endpoint = 'http://127.0.0.1:5000/photos';

const PhotoService = {
  async getAll(): Promise<ReturningService> {
    try {
      const response = await axios.get(endpoint);
      return new ReturningService(response.status, response.data);
    } catch (error) {
      return new ReturningService(500, undefined, error);
    }
  },

  async getById(id: number): Promise<ReturningService> {
    try {
      const response = await axios.get(`${endpoint}/${id}`);
      return new ReturningService(response.status, response.data);
    } catch (error) {
      return new ReturningService(500, undefined, error);
    }
  },

  async create(photo: Omit<Photo, 'id'>): Promise<ReturningService> {
    try {
      const response = await axios.post(`${endpoint}/upload`, photo);
      return new ReturningService(response.status, response.data);
    } catch (error) {
      return new ReturningService(500, undefined, error);
    }
  },

  async update(id: number, photo: Partial<Photo>): Promise<ReturningService> {
    try {
      const response = await axios.put(`${endpoint}/${id}`, photo);
      return new ReturningService(response.status, response.data);
    } catch (error) {
      return new ReturningService(500, undefined, error);
    }
  },

  async delete(id: number): Promise<ReturningService> {
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      return new ReturningService(response.status, { message: 'Deleted successfully' });
    } catch (error) {
      return new ReturningService(500, undefined, error);
    }
  },
};

export default PhotoService;
