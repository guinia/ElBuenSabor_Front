import Persona from "../types/persona";

const API_BASE_URL: string = 'https://seguridad-bs.onrender.com/api/v1/personas';

const tokenObtenido = localStorage.getItem('token');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: Persona): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = { headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenObtenido}` }, method};

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreatePersona = async (persona: Persona) => fetchApiCall('POST', undefined, persona);
const fnDeletePersona = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchPersonas = async () => fetchApiCall('GET');
const fnUpdatePersona = async (persona: Persona) => fetchApiCall('PUT', persona.id, persona);

type dataLayerPersona = {
  create: {
    persona: typeof fnCreatePersona,
  },
  delete: {
    persona: typeof fnDeletePersona,
  },
  fetch: {
    personas: typeof fnFetchPersonas,
  },
  update: {
    persona: typeof fnUpdatePersona,
  }
};

const dataLayerPersona: dataLayerPersona = {
  create: {
    persona: fnCreatePersona,
  },
  delete: {
    persona: fnDeletePersona,
  },
  fetch: {
    personas: fnFetchPersonas,
  },
  update: {
    persona: fnUpdatePersona,
  }
};

export default dataLayerPersona;