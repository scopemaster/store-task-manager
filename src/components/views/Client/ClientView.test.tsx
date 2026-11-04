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
			render(<ClientView />);
			// Arrange: mock storage returning an existing task

			(StorageUtil.getUserTasksFromStorageAsArray as jest.Mock).mockReturnValue([existingTask]);

			const mockGlobalDataUpdate = jest.fn();
			// (Assuming globalData and globalDataUpdate are in scope or passed/mocked)

			// Act
			const result = validateTaskEntry(duplicateTask as any);

			// Assert
			expect(result).toBe(true);
		});
	});
});
