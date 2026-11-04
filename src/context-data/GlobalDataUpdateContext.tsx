import { createContext, useContext } from 'react';
import type { GlobalData } from '../models/GlobalData';

export const GlobalDataUpdateContext = createContext((data: GlobalData) => {});

function useGlobalDataUpdateContext() {
	return useContext(GlobalDataUpdateContext);
}

export default useGlobalDataUpdateContext;
