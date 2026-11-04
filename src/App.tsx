import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ClientView from './components/views/Client/ClientView';
import GlobalDataContextProvider from './context-data/GlobalDataContextProvider';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientView />,
		errorElement: <NotFoundPage />,
	},
]);

function App() {
	return (
		<div className="app-view">
			<GlobalDataContextProvider>
				<RouterProvider router={router} />
			</GlobalDataContextProvider>
		</div>
	);
}

export default App;
