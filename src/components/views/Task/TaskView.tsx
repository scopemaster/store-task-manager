import './TaskView.scss';
import { useState } from 'react';
import { Task } from '../../../models/Task';

interface TaskListProps {
	tasks: Array<Task>;
	onSelectedTask: (item: Task) => void;
}

const TaskView = ({ tasks, onSelectedTask }: TaskListProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<div className="task-view">
			<h1>Tasks</h1>

			{tasks.length === 0 && <p>No tasks found.</p>}

			<ul className="list-group">
				{tasks.map((task, index) => (
					<li
						className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
						key={task.id}
						onClick={() => {
							setSelectedIndex(index);
							onSelectedTask(task);
						}}
					>
						{task.description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskView;
