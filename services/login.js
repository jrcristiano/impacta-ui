import api from '../boot/api';

export default {
  async getUserAuthenticated() {
    return await api.get('/authenticated-user');
  }
}