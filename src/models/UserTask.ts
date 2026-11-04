import { StoreTypeEnum } from '../enums/StoreTypeEnum';
import { Task } from './Task';

export class UserTask {
	public storeId = '';
	public storeName = '';
	public storeType = StoreTypeEnum.NONE;
	public ownerId = ''; // This is the userId
	public ownerName = '';
	public answer = '';
	public comment = '';
	public task = new Task();

	constructor(data: any = null) {
		if (data !== null) {
			this.storeId = data['storeId'];
			this.storeName = data['storeName'];
			this.storeType = data['storeType'];
			this.ownerId = data['ownerId'];
			this.ownerName = data['ownerName'];
			this.answer = data['answer'];
			this.comment = data['comment'];
			this.task = new Task(data['task']);
		}
	}
}
