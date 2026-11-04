import { createContext, useContext } from 'react';
import type { GlobalData } from '../models/GlobalData';

export const GlobalDataContext = createContext<GlobalData | undefined>(undefined);

function useGlobalDataContext() {
	return useContext(GlobalDataContext);
}

export default useGlobalDataContext;
