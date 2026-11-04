import './ClientView.scss';
import { useEffect, useState } from 'react';
import StoreView from '../Store/StoreView';
import { Client } from '../../../models/Client';
import { User } from '../../../models/User';
import { Store } from '../../../models/Store';
import { Task } from '../../../models/Task';
import UserView from '../User/UserView';
import TaskView from '../Task/TaskView';
import AlertView from '../../Alert/AlertView';
import UserTaskView from '../Task/UserTaskView';
import { StorageUtil } from '../../../utils/StorageUtil';
import { UserRoleEnum } from '../../../enums/UserRoleEnum';
import { UserTask } from '../../../models/UserTask';
import useGlobalDataUpdateContext from '../../../context-data/GlobalDataUpdateContext';
import useGlobalDataContext from '../../../context-data/GlobalDataContext';
import { GlobalData } from '../../../models/GlobalData';
import { TaskStatusEnum } from '../../../enums/TaskStatusEnum';

const ClientView = () => {
	const [users, setUsers] = useState(new Array<User>());
	const [clients, setClients] = useState(new Array<Client>());
	const [stores, setStores] = useState(new Array<Store>());
	const [tasks, setTasks] = useState(new Array<Task>());
	const [userTasks, setUserTasks] = useState(new Array<UserTask>());
	const [selectedStore, setSelectedStore] = useState(new Store());
	const globalData = useGlobalDataContext();
	const globalDataUpdate = useGlobalDataUpdateContext();

	useEffect(() => {
		// Use to clear local storage for testing purposes
		// StorageUtil.removeItems();

		/**
		 * Fetch user data from local storage or a
		 * JSON file and update the state with the fetched data
		 */
		const userObj = StorageUtil.getUserFromStorageAsObject();
		if (userObj) {
			const localUsers: Array<User> = userObj['users'].map((userData: any) => new User(userData));
			setUsers(localUsers);
			console.log('Fetched users from LOCAL STORAGE');
		} else {
			console.log('Fetched users from JSON file');
			fetch('/user-data.json')
				.then((res) => res.json())
				.then((json: any) => {
					const users: Array<User> = json['users']
						? json['users'].map((userData: any) => new User(userData))
						: [];

					setUsers(users);
					StorageUtil.saveUserToStorage(json);
				});
		}

		/**
		 * Fetch client data from local storage or a
		 * JSON file and update the state with the fetched data
		 */
		const clientObj = StorageUtil.getClientFromStorageAsObject();
		if (clientObj) {
			const localClients: Array<Client> = clientObj['clients'].map((clientData: any) => new Client(clientData));
			setClients(localClients);
			console.log('Fetched clients from LOCAL STORAGE');
		} else {
			console.log('Fetched clients from JSON file');
			fetch('/client-data.json')
				.then((res) => res.json())
				.then((json: any) => {
					const clients: Array<Client> = json['clients']
						? json['clients'].map((clientData: any) => new Client(clientData))
						: [];

					setClients(clients);
					StorageUtil.saveClientToStorage(json);
				});
		}
	}, []);

	/**
	 * Display the stores and tasks associated with the selected user
	 * @param item
	 */
	const selectedUserHandler = (user: User) => {
		// Set global selected user
		updateGlobalData(user);

		if (user.roles.includes(UserRoleEnum.STORE_MANAGER)) {
			const stores = clients[0].stores.find((store: Store) => store.userId === user.id);
			setStores(stores ? [stores] : []);
			setTasks([]);
		} else if (user.roles.includes(UserRoleEnum.CENTRAL_OPERATIONS)) {
			setStores(clients[0].stores);
			setTasks([]);
		} else if (user.roles.includes(UserRoleEnum.USER)) {
			setStores([]);

			// Fetch user task data from local storage
			const userTaskArr = StorageUtil.getUserTasksFromStorageAsArray();
			if (userTaskArr) {
				const localUserTasks: Array<UserTask> = userTaskArr.map((taskData: any) => new UserTask(taskData));
				const assignedTasks = localUserTasks.map((localTask: UserTask) => localTask.task);
				setTasks(assignedTasks);
				setUserTasks(localUserTasks);
			}
		}
	};

	/**
	 * Update global data property [selectedUser]
	 * @param data
	 */
	const updateGlobalData = (user: User) => {
		if (!user) return;
		const newData = { ...globalData, selectedUser: user };

		// Update global data
		globalDataUpdate(new GlobalData(newData));
	};

	/**
	 * Returns user id based on user role
	 * @returns
	 */
	const getSecondaryUserIdByRole = () => {
		const user = users.find((user: User) => user.roles.includes(UserRoleEnum.USER));
		return user ? user : null;
	};

	/**
	 * Update main tasks based on user task
	 * @param id
	 */
	const updateTaskByUserTaskId = (store: Store) => {
		const userTaskArr = StorageUtil.getUserTasksFromStorageAsArray();
		if (!userTaskArr) return store.tasks;

		// Creates a lookup map
		const userTaskMap = new Map(userTaskArr.map((userTask: UserTask) => [userTask.task.id, userTask]));

		const updatedTasks = store.tasks.map((task: Task) => {
			if (userTaskMap.has(task.id)) {
				// Spread operator merges the old item with the new updates from ArrayB
				return { ...task, ...(userTaskMap.get(task.id) || {}) };
			}
			return task;
		});

		return updatedTasks;
	};

	/**
	 * Add a task to the user's task list and save it to local storage
	 * @param task
	 */
	const addTaskToUser = (task: Task, store: Store) => {
		const newTask = new UserTask();
		newTask.storeId = store.id;
		newTask.storeName = store.name;
		newTask.storeType = store.type;
		newTask.ownerId = getSecondaryUserIdByRole()!.id;
		newTask.ownerName = getSecondaryUserIdByRole()!.name;
		newTask.answer = 'NO';
		newTask.comment = '';

		task.isAssigned = true;
		newTask.task = task;

		const userTaskArr = StorageUtil.getUserTasksFromStorageAsArray();

		if (userTaskArr) {
			userTaskArr.push(newTask);
			StorageUtil.saveUserTasksToStorage(userTaskArr);
		} else {
			StorageUtil.saveUserTasksToStorage([newTask]);
		}
	};

	/**
	 * Updates user task based on the specified id
	 * and save to storage
	 * @param taskId
	 * @returns
	 */
	const updateUserTaskByTaskId = (taskId: string) => {
		const userTaskArr = StorageUtil.getUserTasksFromStorageAsArray();
		if (!userTaskArr) return;

		const index = userTaskArr.findIndex((userTask: UserTask) => userTask.task.id === taskId);

		let updatedTask = null;
		const updatedUserTaskArr = [...userTaskArr];

		if (index !== -1) {
			updatedTask = {
				...updatedUserTaskArr[index],
				task: {
					...updatedUserTaskArr[index].task,
					status: TaskStatusEnum.COMPLETE,
				},
			};

			// update array
			updatedUserTaskArr[index] = updatedTask;
			StorageUtil.saveUserTasksToStorage(updatedUserTaskArr);
		}

		return updatedTask;
	};

	/**
	 * Updates selected task
	 * @param taskId
	 */
	const updateTaskById = (taskId: string) => {
		const clientObj = StorageUtil.getClientFromStorageAsObject();
		if (!clientObj) return;

		const userTask: UserTask = updateUserTaskByTaskId(taskId);
		if (!userTask) return;

		// Get the store
		const store = clientObj['clients'][0].stores.find((store: Store) => store.id === userTask.storeId);
		if (!store) return;

		const taskIndex = store.tasks.findIndex((task: Task) => task.id === taskId);

		if (taskIndex !== -1) {
			// 3. Update the task at that index using bracket notation and object spread
			store.tasks[taskIndex] = {
				...store.tasks[taskIndex],
				status: TaskStatusEnum.COMPLETE,
			};
		}

		StorageUtil.saveClientToStorage(clientObj);
	};

	/**
	 * Store the selected store class and set tasks list
	 * @param store
	 */
	const selectedStoreHandler = (store: Store) => {
		setSelectedStore(store);
		// setTasks(store.tasks);
		setTasks(updateTaskByUserTaskId(store));
	};

	/**
	 * Checks and vaidates if task already exist in user task array
	 * @param selectedTask
	 * @returns
	 */
	function validateTaskEntry(selectedTask: Task) {
		const userTaskArr: Array<UserTask> = StorageUtil.getUserTasksFromStorageAsArray();

		if (userTaskArr) {
			const taskFound = userTaskArr.find((userTask: UserTask) => selectedTask.id === userTask.task.id);

			if (taskFound) {
				const newData = { ...globalData, alertMessage: 'No duplicate tasks allowed!' };
				globalDataUpdate(new GlobalData(newData));
				return true;
			}
		}

		return false;
	}

	/**
	 * Add new task to user
	 * @param task
	 */
	const addTaskHandler = (task: Task) => {
		if (validateTaskEntry(task)) return;
		addTaskToUser(task, selectedStore);
	};

	/**
	 * Completes a selected task
	 * @returns
	 */
	const completeTaskHandler = (task: Task) => {
		updateTaskById(task.id);
	};

	/**
	 * Finds and filter user tasks by specified store type
	 * @param type
	 */
	const selectedStoreTypeHandler = (type: string) => {
		const userTaskArr = StorageUtil.getUserTasksFromStorageAsArray();

		if (userTaskArr) {
			const localUserTasks: Array<UserTask> = userTaskArr
				.filter((userTask: UserTask) => userTask.storeType === type)
				.map((userTask: UserTask) => new UserTask(userTask));

			const assignedTasks = localUserTasks.map((localTask: UserTask) => localTask.task);

			setTasks(assignedTasks);
			setUserTasks(localUserTasks);
		}
	};

	return (
		<section className="client-view">
			<AlertView />

			<section className="client-view__header">
				<h1>Store Task manager</h1>
			</section>

			{clients.length === 0 && <div>No clients found.</div>}
			<section className="client-view__panel">
				<section className="client-view__list">
					<UserView users={users} onSelectedUser={selectedUserHandler} />
					<StoreView stores={stores} onSelectedStore={selectedStoreHandler} />
					<TaskView tasks={tasks} onSelectedTask={addTaskHandler} onCompleteTask={completeTaskHandler} />
				</section>

				<UserTaskView userTasks={userTasks} onSelectedType={selectedStoreTypeHandler} />
			</section>
		</section>
	);
};

export default ClientView;
