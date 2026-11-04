import { User } from './User';

export class GlobalData {
	public alertMessage = '';
	public selectedUser = new User();

	constructor(data: any = null) {
		if (data !== null) {
			this.alertMessage = data['alertMessage'];
			this.selectedUser = new User(data['selectedUser']);
		}
	}
}
