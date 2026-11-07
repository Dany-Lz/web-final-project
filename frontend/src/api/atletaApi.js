const API_URL = '/api/atletas';

// Función auxiliar para extraer el mensaje de error del backend
const manejarRespuesta = async (res) => {
  if (!res.ok) {
    let mensajeError = 'Ocurrió un error en el servidor.';
    try {
      // Intentamos leer el JSON del backend
      const errorData = await res.json();
      mensajeError = errorData.mensaje || errorData.message || mensajeError;
    } catch (e) {
      // Si no es JSON, leemos el texto plano
      try {
        const texto = await res.text();
        mensajeError = texto.substring(0, 100); // Mostrar los primeros 100 caracteres
      } catch {
        // Si todo falla, dejamos el mensaje por defecto
      }
    }
    throw new Error(mensajeError);
  }
  return res;
};

export const obtenerAtletas = async () => {
  const res = await fetch(API_URL);
  await manejarRespuesta(res);
  return res.json();
};

export const eliminarAtleta = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await manejarRespuesta(res);
  return true; // Si no lanzó error, se eliminó bien
};

export const guardarAtleta = async (atleta, esEdicion) => {
  const url = esEdicion ? `${API_URL}/${atleta.numId}` : API_URL;
  const method = esEdicion ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(atleta)
  });
  
  await manejarRespuesta(res);
  return res.json();
};

