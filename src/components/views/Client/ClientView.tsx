import './ClientView.scss';
import { useEffect, useState } from 'react';
import StoreView from '../Store/StoreView';
import { Client } from '../../../models/Client';
import { User } from '../../../models/User';
import { Store } from '../../../models/Store';
import { Task } from '../../../models/Task';
import UserView from '../User/UserView';
import TaskView from '../Task/TaskView';

const ClientView = () => {
	const [users, setUsers] = useState(new Array<User>());
	const [clients, setClients] = useState(new Array<Client>());
	const [stores, setStores] = useState(new Array<Store>());
	const [tasks, setTasks] = useState(new Array<Task>());

	useEffect(() => {
		// Fetech client data from a JSON file and update the state with the fetched data
		fetch('/client-data.json')
			.then((res) => res.json())
			.then((json: any) => {
				const clients: Array<Client> = json['clients']
					? json['clients'].map((clientData: any) => new Client(clientData))
					: [];

				console.log('Fetched clients:', clients);
				setClients(clients);
			});

		fetch('/user-data.json')
			.then((res) => res.json())
			.then((json: any) => {
				const users: Array<User> = json['users']
					? json['users'].map((userData: any) => new User(userData))
					: [];

				setUsers(users);

				setStores(clients[0].stores);
			});
	}, []);

	const selectedUserHandler = (item: User) => {
		console.log(item);
	};

	const selectedStoreHandler = (item: Store) => {
		console.log(item);

		setTasks(item.tasks);
	};

	const selectedTaskHandler = (item: Task) => {
		console.log(item);
	};

	return (
		<section className="client-view">
			{clients.length === 0 && <p>No clients found.</p>}
			<UserView users={users} onSelectedUser={selectedUserHandler} />
			<StoreView stores={stores} onSelectedStore={selectedStoreHandler} />
			<TaskView tasks={tasks} onSelectedTask={selectedTaskHandler} />
		</section>
	);
};

export default ClientView;
