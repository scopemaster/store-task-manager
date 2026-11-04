import { render } from '@testing-library/react';
import React from 'react';
import { StorageUtil } from '../../../utils/StorageUtil';
import ClientView from './ClientView';

// jest.mock('./StorageUtil');

jest.mock('./StorageUtil', () => ({
	StorageUtil: {
		getUserTasksFromStorageAsArray: jest.fn(),
		saveUserTasksToStorage: jest.fn(),
	},
}));

const existingTask = { task: { id: 't1', name: 'Test Task' } };
const duplicateTask = { id: 't1', name: 'Test Task' };

describe('Task Management Functions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('validateTaskEntry', () => {
		test('returns true and triggers alert if task already exists', () => {
			// render(<ClientView />);

			(StorageUtil.getUserTasksFromStorageAsArray as jest.Mock).mockReturnValue([existingTask]);
			// const mockGlobalDataUpdate = jest.fn();
			// const result = validateTaskEntry(duplicateTask as any);

			// Assert
		});
	});
});
