export class StorageUtil {
	public static USER_DATA = 'userData';

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

		if (savedUser) {
			return JSON.parse(this.getItem(StorageUtil.USER_DATA)!);
		}
		return null;
	}

	/**
	 * Saves user data object to storage.
	 * @param dataObj
	 */
	public static saveUserToStorage(dataObj: any = null, callback?: () => void): void {
		this.setItem(StorageUtil.USER_DATA, JSON.stringify(dataObj));

		if (callback) {
			callback();
		}
	}
}
