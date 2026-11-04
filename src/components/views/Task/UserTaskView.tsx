import './UserTaskView.scss';
import { useState } from 'react';
import { User } from '../../../models/User';
import type { UserTask } from '../../../models/UserTask';
import type { StoreTypeEnum } from '../../../enums/StoreTypeEnum';

interface UserTaskListProps {
	userTasks: Array<UserTask>;
	onSelectedType?: (type: StoreTypeEnum) => void;
}

const UserTaskView = ({ userTasks, onSelectedType }: UserTaskListProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<div className="user-task-view">
			<section className="user-task-view__header">
				<h1>Secondary User Tasks</h1>

				<section className="user-task-view__type">
					<div
						className="form-field"
						style={{
							marginRight: '20px',
							fontSize: '20px',
						}}
					>
						<input
							className="radio"
							name="radios"
							type="radio"
							id="radioLabel"
							value="Superstore"
							style={{
								marginRight: '5px',
							}}
							onChange={(event) => onSelectedType(event.target.value)}
						/>
						<label htmlFor="radioLabel">Superstore</label>
					</div>

					<div
						className="form-field"
						style={{
							fontSize: '20px',
						}}
					>
						<input
							className="radio"
							name="radios"
							type="radio"
							id="radioLabel2"
							value="Express"
							style={{
								marginRight: '5px',
							}}
							onChange={(event) => onSelectedType(event.target.value)}
						/>
						<label htmlFor="radioLabel2">Express</label>
					</div>
				</section>
			</section>

			{userTasks.length === 0 && <p>No user task found.</p>}

			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Owner</th>
						<th scope="col">Type</th>
						<th scope="col">Task</th>
						<th scope="col">Status</th>
					</tr>
				</thead>

				<tbody className="table-group-divider">
					{userTasks.map((userTask, index) => (
						<tr>
							<th scope="row">{index}</th>
							<td>{userTask.ownerName}</td>
							<td>{userTask.storeType}</td>
							<td>{userTask.task.description}</td>
							<td>
								<span
									className={
										selectedIndex === index ? 'badge app-theme-inverse' : 'badge app-theme-warning'
									}
								>
									{userTask.task.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserTaskView;
