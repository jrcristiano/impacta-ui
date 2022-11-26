import api from '../boot/api';

export default {
  async getAll(params = {}) {
    let url = '/users?relations=true&limit=8';

    if (params.buscar) {
      url = url.concat(`&search=${params.buscar}`);
    } 
    
    if (params.school) {
      url = url.concat(`&school=${params.school}`);
    }

    if (params.role) {
      url = url.concat(`&role=${params.role}`);
    }

    return await api.get(url);
  },

  async show(id) {
    return await api.get(`/users/${id}?relations=true`)
  },

  async store(data) {
    return await api.post('/users', data);
  },

  async update(data, id) {
    return await api.put(`/users/${id}`, data); 
  },

  async delete(id) {
    return await api.delete(`/users/${id}`);
  }
};