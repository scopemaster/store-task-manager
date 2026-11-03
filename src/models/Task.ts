export class Task {
	public id = '';
	public name = '';
	public description = '';
	public status = '';
	public isAssigned = false;
	public assignedTo = '';
	public comment = '';

	constructor(data: any = null) {
		if (data !== null) {
			this.id = data['id'];
			this.name = data['name'];
			this.description = data['description'];
			this.status = data['status'];
			this.isAssigned = data['isAssigned'];
			this.assignedTo = data['assignedTo'];
			this.comment = data['comment'];
		}
	}
}
