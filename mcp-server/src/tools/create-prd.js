/**
 * Tool to create a Product Requirements Document (PRD) using AI assistance
 */

import { z } from 'zod';
import { createTool } from '../utils.js';
import { createPRD } from '../../../scripts/modules/task-manager/create-prd.js';
import { initTaskMaster } from '../../../src/task-master.js';
import { TASKMASTER_DOCS_DIR } from '../../../src/constants/paths.js';
import path from 'path';

const CreatePRDInputSchema = z.object({
	description: z.string().min(1).describe(
		'High-level description of the project or product to create a PRD for'
	),
	outputPath: z.string().optional().describe(
		`Output file path for the PRD. Defaults to ${TASKMASTER_DOCS_DIR}/prd.txt`
	),
	template: z.enum(['minimal', 'standard', 'detailed']).default('standard').describe(
		'Template type to use: minimal (basic structure), standard (comprehensive), or detailed (extensive with technical sections)'
	),
	research: z.boolean().default(false).describe(
		'Whether to use research AI for more comprehensive and up-to-date content'
	),
	force: z.boolean().default(false).describe(
		'Whether to overwrite an existing PRD file at the output path'
	)
});

export default createTool({
	name: 'create-prd',
	description: `Create a Product Requirements Document (PRD) using AI assistance. This tool generates a comprehensive PRD based on your project description, which can then be used with the parse-prd tool to generate development tasks. The PRD will be saved to ${TASKMASTER_DOCS_DIR}/prd.txt by default.`,
	inputSchema: CreatePRDInputSchema,
	execute: async ({ description, outputPath, template, research, force }) => {
		try {
			// Initialize TaskMaster for project context
			const taskMaster = initTaskMaster({});
			const projectRoot = taskMaster.getProjectRoot();

			// Set default output path if not provided
			if (!outputPath) {
				outputPath = path.join(projectRoot, TASKMASTER_DOCS_DIR, 'prd.txt');
			} else if (!path.isAbsolute(outputPath)) {
				outputPath = path.join(projectRoot, outputPath);
			}

			// Create the PRD
			const result = await createPRD(description, outputPath, {
				projectRoot,
				template,
				research,
				force
			});

			if (result.success) {
				return {
					success: true,
					message: `PRD created successfully at ${result.path}`,
					data: {
						path: result.path,
						template: template,
						research: research,
						nextSteps: [
							`Review the generated PRD at: ${result.path}`,
							`Use parse-prd tool to generate tasks from this PRD`,
							'Start implementing your development tasks!'
						]
					}
				};
			} else {
				return {
					success: false,
					error: 'Failed to create PRD'
				};
			}

		} catch (error) {
			// Provide helpful error messages
			if (error.message.includes('already exists')) {
				return {
					success: false,
					error: `PRD file already exists. Use force: true to overwrite, or specify a different outputPath.`,
					details: error.message
				};
			} else if (error.message.includes('API key')) {
				return {
					success: false,
					error: 'AI service configuration error. Please check your API keys in environment variables or .mcp.json.',
					details: error.message
				};
			} else {
				return {
					success: false,
					error: `Failed to create PRD: ${error.message}`,
					details: error.stack
				};
			}
		}
	}
});