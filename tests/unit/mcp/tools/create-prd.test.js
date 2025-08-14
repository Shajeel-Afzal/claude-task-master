/**
 * create-prd.test.js
 * Tests for the create-prd MCP tool
 */

import { beforeEach, afterEach, describe, test, expect, jest } from '@jest/globals';
import createPrdTool from '../../../mcp-server/src/tools/create-prd.js';
import { createPRD } from '../../../scripts/modules/task-manager/create-prd.js';
import { initTaskMaster } from '../../../src/task-master.js';

jest.mock('../../../scripts/modules/task-manager/create-prd.js');
jest.mock('../../../src/task-master.js');

describe('create-prd MCP tool', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		
		// Mock initTaskMaster
		initTaskMaster.mockReturnValue({
			getProjectRoot: () => '/test/project'
		});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	test('should have correct tool configuration', () => {
		expect(createPrdTool.name).toBe('create-prd');
		expect(createPrdTool.description).toContain('Product Requirements Document');
		expect(createPrdTool.inputSchema).toBeDefined();
	});

	test('should execute successfully with valid input', async () => {
		createPRD.mockResolvedValue({
			success: true,
			path: '/test/project/.taskmaster/docs/prd.txt',
			content: 'PRD content'
		});

		const input = {
			description: 'A web application for task management',
			template: 'standard',
			research: false,
			force: false
		};

		const result = await createPrdTool.execute(input);

		expect(result.success).toBe(true);
		expect(result.message).toContain('PRD created successfully');
		expect(result.data).toMatchObject({
			path: '/test/project/.taskmaster/docs/prd.txt',
			template: 'standard',
			research: false,
			nextSteps: expect.arrayContaining([
				expect.stringContaining('Review the generated PRD'),
				expect.stringContaining('Use parse-prd tool'),
				expect.stringContaining('Start implementing')
			])
		});
	});

	test('should handle file exists error gracefully', async () => {
		createPRD.mockRejectedValue(new Error('PRD file already exists at /test/path'));

		const input = {
			description: 'Test project',
			template: 'minimal',
			research: false,
			force: false
		};

		const result = await createPrdTool.execute(input);

		expect(result.success).toBe(false);
		expect(result.error).toContain('already exists');
		expect(result.error).toContain('force: true');
	});

	test('should handle API key errors appropriately', async () => {
		createPRD.mockRejectedValue(new Error('API key not found'));

		const input = {
			description: 'Test project',
			template: 'standard',
			research: true,
			force: false
		};

		const result = await createPrdTool.execute(input);

		expect(result.success).toBe(false);
		expect(result.error).toContain('API service configuration error');
		expect(result.details).toContain('API key not found');
	});

	test('should use default output path when not provided', async () => {
		createPRD.mockResolvedValue({
			success: true,
			path: '/test/project/.taskmaster/docs/prd.txt',
			content: 'PRD content'
		});

		const input = {
			description: 'Project without custom path',
			template: 'standard',
			research: false,
			force: false
		};

		await createPrdTool.execute(input);

		expect(createPRD).toHaveBeenCalledWith(
			'Project without custom path',
			'/test/project/.taskmaster/docs/prd.txt',
			expect.objectContaining({
				projectRoot: '/test/project',
				template: 'standard',
				research: false,
				force: false
			})
		);
	});

	test('should handle relative output paths correctly', async () => {
		createPRD.mockResolvedValue({
			success: true,
			path: '/test/project/custom/prd.txt',
			content: 'PRD content'
		});

		const input = {
			description: 'Project with custom path',
			outputPath: 'custom/prd.txt',
			template: 'detailed',
			research: true,
			force: false
		};

		await createPrdTool.execute(input);

		expect(createPRD).toHaveBeenCalledWith(
			'Project with custom path',
			'/test/project/custom/prd.txt',
			expect.objectContaining({
				projectRoot: '/test/project',
				template: 'detailed',
				research: true,
				force: false
			})
		);
	});
});