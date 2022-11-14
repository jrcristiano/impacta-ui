import api from '../boot/api';

export default {
  async getUserAuthenticated() {
    try {
      return await api.get('/authenticated-user');
    } catch (error) {
      throw new Error('Usuário não autênticado');
    }
  }
}