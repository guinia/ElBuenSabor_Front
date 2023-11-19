import UnidadMedida  from "../types/unidadMedida";


const API_BASE_URL = 'https://buensaborseg.onrender.com/api/v1/unidadmedida';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: UnidadMedida): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {headers: {'Content-Type': 'application/json' }, method };

    if (payload) {
        options.body = JSON.stringify(payload);
    }
    const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
    const data = await response.json();

    return data;
};

const fnCreateUnidadMedida = async (unidad: UnidadMedida) => fetchApiCall('POST', undefined, unidad);
const fnDeleteUnidadMedida = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchUnidadMedida = async () => fetchApiCall('GET');
const fnUpdateUnidadMedida = async (unidad: UnidadMedida) => fetchApiCall('PUT', unidad.id, unidad);

type UnidadMedidaLayer = { 
    create: {
        unidad: typeof fnCreateUnidadMedida,
    },
    delete: {
        unidad: typeof fnDeleteUnidadMedida,
    },
    fetch: {
        unidades: typeof fnFetchUnidadMedida,
    },
    update: {
        unidad: typeof fnUpdateUnidadMedida,
    }
};

const UnidadMedidaLayer: UnidadMedidaLayer = {
    create: {
        unidad: fnCreateUnidadMedida,
    },
    delete: {
        unidad: fnDeleteUnidadMedida,
    },
    fetch: {
        unidades: fnFetchUnidadMedida,
    },
    update: {
        unidad: fnUpdateUnidadMedida,
    }
};
    
export default UnidadMedidaLayer;