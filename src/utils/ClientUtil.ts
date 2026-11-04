// export class ClientUtil {
// 	setItem(key: string, value: string): void {
// 		localStorage.setItem(key, value);
// 	}

// 	/**
// 	 * Checks and vaidates if task already exist in user task array
// 	 * @param selectedTask
// 	 * @returns
// 	 */
// 	public static validateTaskEntry(selectedTask: Task): boolean {
// 		const userTaskArr: Array<UserTask> = StorageUtil.getUserTasksFromStorageAsArray();

// 		if (userTaskArr) {
// 			const taskFound = userTaskArr.find((userTask: UserTask) => selectedTask.id === userTask.task.id);

// 			if (taskFound) {
// 				const newData = { ...globalData, alertMessage: 'No duplicate tasks allowed!' };
// 				globalDataUpdate(new GlobalData(newData));
// 				return true;
// 			}
// 		}

// 		return false;
// 	}
// }
