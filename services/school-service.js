import api from "../boot/api";

export default {
  async getAll(params = {}) {
    const buscar = params.buscar || '';
    const segmentos = params.segmentos || [];
    const status = params.status || '';

    let queryString = `/schools?search=${buscar}&status=${status}&relations=true&eager=true`;
    
    for (const segmento of segmentos) {
      queryString += `&segmentos[]=${segmento}`;
    }
    
    return await api.get(queryString);
  },

  async getNameEscolas() {
    return await api.get('/schools?columns[]=name&order=ASC&sort[]=name');
  },
  
  store(data) {
    return api.post('/schools', data);
  },

  update(id, data) {
    return api.put(`/schools/${id}`, data);
  },

  show(id) {
    return api.get(`/schools/${id}`);
  },

  delete(id) {
    return api.delete(`/schools/${id}`);
  } 
};
