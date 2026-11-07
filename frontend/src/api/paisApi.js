const API_URL = '/api/paises';

export const obtenerPaises = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al cargar los países');
  return res.json();
};