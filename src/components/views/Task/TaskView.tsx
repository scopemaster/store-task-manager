import './TaskView.scss';
import { useState } from 'react';
import { Task } from '../../../models/Task';
import useGlobalDataContext from '../../../context-data/GlobalDataContext';

interface TaskListProps {
	tasks: Array<Task>;
	onSelectedTask: (item: Task) => void;
	onCompleteTask: (item: Task) => void;
}

const TaskView = ({ tasks, onSelectedTask, onCompleteTask }: TaskListProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const globalData = useGlobalDataContext();

	return (
		<div className="task-view">
			<section className="task-view__header">
				<h1>Tasks</h1>
				<span className="badge">{tasks.length}</span>
			</section>

			{tasks.length === 0 && <p>No tasks found.</p>}

			<ul className="list-group">
				{tasks.map((task, index) => (
					<li
						className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
						key={task.id}
						onClick={() => {
							setSelectedIndex(index);
						}}
					>
						<section className="task-view__item">
							<section className="item-details">
								<input
									style={{
										marginRight: '10px',
									}}
									type="checkbox"
									className="check"
									checked={selectedIndex === index}
									onChange={(e) => {}}
								/>
								<img />
								<div>{task.description}</div>
							</section>

							<span
								className={
									selectedIndex === index ? 'badge app-theme-inverse' : 'badge app-theme-warning'
								}
							>
								{task.status}
							</span>
						</section>

						{(globalData.selectedUser.roles.includes('STORE_MANAGER') ||
							globalData.selectedUser.roles.includes('CENTRAL_OPERATIONS')) && (
							<section>
								<button type="button" className="btn">
									Yes
								</button>

								<button
									type="button"
									className="btn"
									onClick={() => {
										onSelectedTask(task);
									}}
								>
									No
								</button>
							</section>
						)}

						{globalData.selectedUser.roles.includes('USER') && (
							<section>
								<button
									type="button"
									className="btn"
									onClick={() => {
										onCompleteTask(task);
									}}
								>
									Complete
								</button>
							</section>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskView;
