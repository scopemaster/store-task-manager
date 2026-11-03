import { StoreCategoryEnum } from '../enums/StoreCategoryEnum';
import { Store } from './Store';

export class Client {
	public id = '';
	public name = '';
	public category = StoreCategoryEnum.NONE;
	public stores = new Array<Store>();

	constructor(data: any = null) {
		if (data !== null) {
			this.id = data['id'];
			this.name = data['name'];
			this.category = data['category'];
			this.stores = data['stores'] ? data['stores'].map((storeData: any) => new Store(storeData)) : [];
		}
	}
}
