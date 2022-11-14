import api from '../boot/api';

export default {
  async getAll() {
    return await api.get('/segments');
  }
};
