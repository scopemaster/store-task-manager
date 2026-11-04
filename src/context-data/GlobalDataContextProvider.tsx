import { useState, type ReactNode } from 'react';
import { GlobalDataContext } from './GlobalDataContext';
import { GlobalDataUpdateContext } from './GlobalDataUpdateContext';
import { GlobalData } from '../models/GlobalData';

interface Props {
	children: ReactNode;
}

const GlobalDataContextProvider = ({ children }: Props) => {
	const [globalData, setGlobalData] = useState(new GlobalData());

	const updateData = (data: GlobalData) => {
		setGlobalData(data);
	};

	return (
		<GlobalDataContext.Provider value={globalData}>
			<GlobalDataUpdateContext.Provider value={updateData}>{children}</GlobalDataUpdateContext.Provider>
		</GlobalDataContext.Provider>
	);
};

export default GlobalDataContextProvider;
