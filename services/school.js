import api from "../boot/api";

export default {
  async getAll(params = {}) {
    let url = `/schools?relations=true&eager=true`;
    if (params.buscar) {
      url = url.concat(`&search=${params.buscar}`);
    }

    if (params.status) {
      url = url.concat(`&status=${params.status}`)
    }
    
    const segmentos = params.segmentos || [];
    for (const segmento of segmentos) {
      url += url.concat(`&segmentos[]=${segmento}`);
    }
    
    return await api.get(url);
  },

  async getNameEscolas() {
    return await api.get('/schools?columns[]=name');
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
