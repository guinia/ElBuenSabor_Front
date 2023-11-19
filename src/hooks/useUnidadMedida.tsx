import * as React from 'react';

import UnidadMedida from '../types/unidadMedida';
import UnidadMedidaLayer from '../libs/dataLayerUnidadMedida';

type UseUnidadMedidaState = {
    data: UnidadMedida[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    loading: boolean;
};

const initialState: UseUnidadMedidaState = {
    data: [],
    error: null,
    loading: true,
};

const useUnidadMedida = () => {
    //State
    const [state, setState] = React.useState<UseUnidadMedidaState>(initialState);

    //Effects
    React.useEffect(function fetchUnidadMedida() {
        UnidadMedidaLayer.fetch.unidades()
            .then((data: UnidadMedida[]) => setState({data, error: null, loading: false}))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => setState({data: [], error, loading: false}));

    }, [setState]);

    return state;
};

export default useUnidadMedida;