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
  async delete(id) {
    return await api.delete(`/users/${id}`);
  }
};