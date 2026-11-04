import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ClientView from './components/views/Client/ClientView';

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientView />,
		errorElement: <NotFoundPage />,
	},

	// {
	// 	path: '/sign-in',
	// 	element: (
	// 		<Layout>
	// 			<SignIn />
	// 		</Layout>
	// 	),
	// },

	// {
	// 	path: '/reset-password/:token/:userId',
	// 	element: (
	// 		<Layout>
	// 			<ResetPassword />
	// 		</Layout>
	// 	),
	// },
	// {
	// 	path: '/profile',
	// 	element: (
	// 		<ProtectedRoute>
	// 			<Layout>
	// 				<UserProfile />
	// 			</Layout>
	// 		</ProtectedRoute>
	// 	),
	// },
]);

function App() {
	return (
		<div className="app-view">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
