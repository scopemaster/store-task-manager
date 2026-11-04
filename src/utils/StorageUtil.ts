export class StorageUtil {
	public static USER_DATA = 'userData';
	public static CLIENT_DATA = 'clientData';
	public static USER_TASK_DATA = 'userTaskData';

	public static setItem(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	public static getItem(key: string): string | null | undefined {
		return localStorage.getItem(key);
	}

	public static removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	public static removeItems(): void {
		localStorage.clear();
	}

	/**
	 * Returns user data as object from storage.
	 * @returns
	 */
	public static getUserFromStorageAsObject(): any | null {
		const savedUser = this.getItem(StorageUtil.USER_DATA);
		if (!savedUser) return null;

		return JSON.parse(this.getItem(StorageUtil.USER_DATA)!);
	}

	/**
	 * Saves user data object to storage.
	 * @param dataObj
	 */
	public static saveUserToStorage(dataObj: any): void {
		this.setItem(StorageUtil.USER_DATA, JSON.stringify(dataObj));
	}

	/**
	 * Returns client data as object from storage.
	 * @returns
	 */
	public static getClientFromStorageAsObject(): any | null {
		const savedClient = this.getItem(StorageUtil.CLIENT_DATA);
		if (!savedClient) return null;

		return JSON.parse(this.getItem(StorageUtil.CLIENT_DATA)!);
	}

	/**
	 * Saves client data object to storage.
	 * @param dataObj
	 */
	public static saveClientToStorage(dataObj: any = null): void {
		this.setItem(StorageUtil.CLIENT_DATA, JSON.stringify(dataObj));
	}

	/**
	 * Returns user tasks data as object from storage.
	 * @returns
	 */
	public static getUserTasksFromStorageAsArray(): any | null {
		const savedUserTasks = this.getItem(StorageUtil.USER_TASK_DATA);
		if (!savedUserTasks) return null;

		return JSON.parse(this.getItem(StorageUtil.USER_TASK_DATA)!);
	}

	/**
	 * Saves user tasks data object to storage.
	 * @param dataObj
	 */
	public static saveUserTasksToStorage(dataObj: any = null): void {
		this.setItem(StorageUtil.USER_TASK_DATA, JSON.stringify(dataObj));
	}
}
