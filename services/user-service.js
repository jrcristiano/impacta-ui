import api from '../boot/api';

export default {
  async getAll(params = {}) {
    return await api.get('/users?relations=true&limit=8');
  }
};