import { StoreTypeEnum } from '../enums/StoreTypeEnum';
import { Task } from './Task';

export class Store {
	public id = '';
	public type = StoreTypeEnum.NONE;
	public name = '';
	public isSelected = false; // For UI selection purposes
	public tasks = new Array<Task>();

	constructor(data: any = null) {
		if (data !== null) {
			this.id = data['id'];
			this.type = data['type'];
			this.name = data['name'];
			this.isSelected = data['isSelected'];
			this.tasks = data['tasks'] ? data['tasks'].map((taskData: any) => new Task(taskData)) : [];
		}
	}
}
