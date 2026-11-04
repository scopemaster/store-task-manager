import useGlobalDataContext from '../../context-data/GlobalDataContext';
import useGlobalDataUpdateContext from '../../context-data/GlobalDataUpdateContext';
import { GlobalData } from '../../models/GlobalData';
import './AlertView.scss';

const AlertView = () => {
	const globalData = useGlobalDataContext();
	const globalDataUpdate = useGlobalDataUpdateContext();

	/**
	 * Close Alert(Me)
	 */
	const onCloseHandler = () => {
		const newData = { ...globalData, alertMessage: '' };
		globalDataUpdate(new GlobalData(newData));
	};

	return (
		<section>
			{globalData.alertMessage && (
				<div class="alert theme-warning" role="alert">
					<p>{message}</p>
					<button
						type="button"
						class="btn-close ms-auto"
						data-bs-dismiss="alert"
						aria-label="Close"
						onClick={onCloseHandler}
					></button>
				</div>
			)}
		</section>
	);
};

export default AlertView;
