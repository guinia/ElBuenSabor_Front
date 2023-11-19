import RubroArticuloInsumo from "../types/rubroArticuloInsumo";

const API_BASE_URL: string = 'https://elbuensabor-gaqt.onrender.com/api/v1/RubroArticuloInsumo';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: RubroArticuloInsumo): Promise<any> => {
    const options: any = { headers: { 'Content-Type': 'application/json' }, method };

    if (payload) {
        options.body = JSON.stringify(payload);
    }

    const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
    const data = await response.json();

    return data;
};

const fnCreateRubro = async (rubroArticuloInsumo: RubroArticuloInsumo) => fetchApiCall('POST', undefined, rubroArticuloInsumo);
const fnDeleteRubro = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchRubro = async () => fetchApiCall('GET');
const fnUpdateRubro = async (rubroArticuloInsumo: RubroArticuloInsumo) => fetchApiCall('PUT', rubroArticuloInsumo.id, rubroArticuloInsumo);

type dataLayerRubroArticuloInsumo = {
    create: {
        rubroArticuloInsumo: typeof fnCreateRubro,
    },
    delete: {
        rubroArticuloInsumo: typeof fnDeleteRubro,
    },
    fetch: {
        rubroArticuloInsumo: typeof fnFetchRubro,
    },
    update: {
        rubroArticuloInsumo: typeof fnUpdateRubro,
    }
};

const dataLayerRubroArticuloInsumo: dataLayerRubroArticuloInsumo = {
    create: {
        rubroArticuloInsumo: fnCreateRubro,
    },
    delete: {
        rubroArticuloInsumo: fnDeleteRubro,
    },
    fetch: {
        rubroArticuloInsumo: fnFetchRubro,
    },
    update: {
        rubroArticuloInsumo: fnUpdateRubro,
    }
};

export default dataLayerRubroArticuloInsumo;