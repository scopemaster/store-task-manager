import './StoreView.scss';
import { useState } from 'react';
import { Store } from '../../../models/Store';

interface StoreListProps {
	stores: Array<Store>;
	onSelectedStore: (item: Store) => void;
}

const StoreView = ({ stores, onSelectedStore }: StoreListProps) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<div className="store-view">
			<h1>Stores</h1>

			{stores.length === 0 && <p>No stores found.</p>}

			<ul className="list-group">
				{stores.map((store, index) => (
					<li
						className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
						key={store.id}
						onClick={() => {
							setSelectedIndex(index);
							onSelectedStore(store);
						}}
					>
						{store.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default StoreView;
