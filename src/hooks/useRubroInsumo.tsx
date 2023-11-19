import * as React from 'react';

import dataLayerRubroArticuloInsumo from '../libs/dataLayerRubroArticuloInsumo';
import RubroArticuloInsumo from '../types/rubroArticuloInsumo';

type UseRubroInsumoState = {
  data: RubroArticuloInsumo[];
  error: any;
  loading: boolean;
};

const initialState: UseRubroInsumoState = {
  data: [],
  error: null,
  loading: true,
};

const UseRubroInsumo = () => {
  // State
  const [state, setState] = React.useState<UseRubroInsumoState>(initialState);

  // Effects
  React.useEffect(function fetchRubro() {
      dataLayerRubroArticuloInsumo.fetch.rubroArticuloInsumo()
      .then((data: RubroArticuloInsumo[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default UseRubroInsumo;