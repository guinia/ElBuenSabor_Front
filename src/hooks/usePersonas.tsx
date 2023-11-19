import * as React from 'react';

import dataLayerPersona from '../libs/dataLayerPersona';
import Persona from "../types/persona";

type UsePersonasState = {
  data: Persona[];
  error: any;
  loading: boolean;
};

const initialState: UsePersonasState = {
  data: [],
  error: null,
  loading: true,
};

const usePersonas = () => {
  // State
  const [state, setState] = React.useState<UsePersonasState>(initialState);

  // Effects
  React.useEffect(function fetchPersonas() {
    dataLayerPersona.fetch.personas()
      .then((data: Persona[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default usePersonas;