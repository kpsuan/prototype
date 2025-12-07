import api from './api';

export const questionsService = {
  getAll: (params = {}) => api.get('/questions', { params }),
  getById: (id) => api.get(`/questions/${id}`),
  getBySection: (sectionId) => api.get(`/questions/section/${sectionId}`)
};

export const checkpointsService = {
  getAll: (params = {}) => api.get('/checkpoints', { params }),
  getById: (id) => api.get(`/checkpoints/${id}`)
};

export const responsesService = {
  getAll: (params = {}) => api.get('/responses', { params }),
  save: (data) => api.post('/responses', data),
  getSummary: (userId) => api.get(`/responses/summary/${userId}`)
};

export const usersService = {
  getTeam: () => api.get('/users/team'),
  getSections: () => api.get('/users/sections')
};
