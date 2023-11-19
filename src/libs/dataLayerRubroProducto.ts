import RubroProducto from "../types/rubroProducto";

const API_BASE_URL: string = 'https://seguridad-bs.onrender.com/api/v1/RubroArticuloManufacturado';



const tokenObtenido = localStorage.getItem('token');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: RubroProducto): Promise<any> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenObtenido}` }, method};

    if (payload) {
        options.body = JSON.stringify(payload);
    }
    const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
    const data = await response.json();

    return data;
};

const fnCreateRubroProducto = async (rubroProducto: RubroProducto) => fetchApiCall('POST', undefined, rubroProducto);
const fnDeleteRubroProducto = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchRubrosProductos = async () => fetchApiCall('GET');
const fnUpdateRubroProducto = async (rubroProducto: RubroProducto) => fetchApiCall('PUT', rubroProducto.id, rubroProducto);

type dataLayerRubroProducto= {
    create: {
        rubroProducto: typeof fnCreateRubroProducto,
    },
    delete: {
        rubroProducto: typeof fnDeleteRubroProducto,
    },
    fetch: {
        rubrosProductos: typeof fnFetchRubrosProductos,
    },
    update: {
        rubroProducto: typeof fnUpdateRubroProducto,
    }
};

const dataLayerRubroProducto: dataLayerRubroProducto = {
    create: {
        rubroProducto: fnCreateRubroProducto,
    },
    delete: {
        rubroProducto: fnDeleteRubroProducto,
    },
    fetch: {
        rubrosProductos: fnFetchRubrosProductos,
    },
    update: {
        rubroProducto: fnUpdateRubroProducto,
    }
};

export default dataLayerRubroProducto;
