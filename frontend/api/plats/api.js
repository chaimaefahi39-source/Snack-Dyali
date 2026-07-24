import instance from '../instance';

export const getPlats = async () => {
  const response = await instance.get('/plats');
  return response.data;
};

export const addPlat = async (newPlat) => {
  const response = await instance.post('/plats', newPlat);
  return response.data;
};

export const deletePlat = async (id) => {
  const response = await instance.delete(`/plats/${id}`);
  return response.data;
};
