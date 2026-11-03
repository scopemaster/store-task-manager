import { UserRoleEnum } from '../enums/UserRoleEnum';

export class User {
	public id = '';
	public name = '';
	public email = '';
	public password = '';
	public avatar = '';
	public roles = new Array<UserRoleEnum>();
	public timestamp = Date.now();
	public dateCreated = new Date();

	constructor(data: any = null) {
		if (data !== null) {
			this.id = data['id'];
			this.name = data['name'];
			this.email = data['email'];
			this.password = data['password'];
			this.avatar = data['avatar'];
			this.roles = data['role'];
			this.timestamp = data['timestamp'];
			this.dateCreated = new Date(data['dateCreated']);
		}
	}
}
