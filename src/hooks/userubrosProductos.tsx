import * as React from 'react';

import DataLayer from '../libs/dataLayerRubroProducto';
import RubroProducto from '../types/rubroProducto';

type UseRubrosProductosState = { 
    data: RubroProducto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    loading: boolean;
};

const initialState: UseRubrosProductosState = { 
    data: [],
    error: null,
    loading: true,
};

const useRubrosProductos = () => { 
    // State
    const [state, setState] = React.useState<UseRubrosProductosState>(initialState); 

    // Effects
    React.useEffect(() => {
        function fetchRubrosProductos() { 
            DataLayer.fetch.rubrosProductos() 
                .then((data: RubroProducto[]) => setState({ data, error: null, loading: false }))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => setState({ data: [], error, loading: false }));
        }

        fetchRubrosProductos();
    }, [setState]);

    return state;
};

export default useRubrosProductos; 
