import './UserView.scss';
import { useState } from 'react';
import { User } from '../../../models/User';

interface UserListProps {
	users: Array<User>;
	onSelectedUser: (item: User) => void;
}

const UserView = ({ users, onSelectedUser }: UserListProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<div className="user-view">
			<h1>Users</h1>

			{users.length === 0 && <p>No users found.</p>}

			<ul className="list-group">
				{users.map((user, index) => (
					<li
						className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
						key={user.id}
						onClick={() => {
							setSelectedIndex(index);
							onSelectedUser(user);
						}}
					>
						{user.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserView;
