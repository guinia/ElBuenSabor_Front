import ArticuloInsumo from '../types/articuloInsumo';


const API_BASE_URL: string = 'https://buensaborseg.onrender.com/api/v1/articulosinsumos';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: ArticuloInsumo): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {headers: {'Content-Type': 'application/json' }, method};

    if (payload) {
        options.body = JSON.stringify(payload);
    }
    const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
    const data = await response.json();

    return data;
};

const fnCreateInsumo = async (insumo: ArticuloInsumo) => fetchApiCall('POST', undefined, insumo);
const fnDeleteInsumo = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchInsumos = async () => fetchApiCall('GET');
const fnUpdateInsumo = async (insumo: ArticuloInsumo) => fetchApiCall('PUT', insumo.id, insumo);

type DataLayerArticuloInsumo = {
    create: {
        insumo: typeof fnCreateInsumo,
    },
    delete: {
        insumo: typeof fnDeleteInsumo,
    },
    fetch: {
        insumos: typeof fnFetchInsumos,
    },
    update: {
        insumo: typeof fnUpdateInsumo,
    }
};

const DataLayerArticuloInsumo: DataLayerArticuloInsumo = {
    create: {
        insumo: fnCreateInsumo,
    },
    delete: {
        insumo: fnDeleteInsumo,
    },
    fetch: {
        insumos: fnFetchInsumos,
    },
    update: {
        insumo: fnUpdateInsumo,
    }
};

export default DataLayerArticuloInsumo;