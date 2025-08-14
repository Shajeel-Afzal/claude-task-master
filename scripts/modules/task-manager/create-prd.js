/**
 * create-prd.js
 * Create a Product Requirements Document (PRD) using AI assistance
 */

import { log } from '../utils.js';
import { getConfig } from '../config-manager.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { generateTextService } from '../ai-services-unified.js';
import { TASKMASTER_DOCS_DIR } from '../../../src/constants/paths.js';

/**
 * Create a PRD using AI assistance
 * @param {string} projectDescription - High-level description of the project
 * @param {string} outputPath - Path where the PRD should be saved
 * @param {Object} options - Additional options
 * @param {string} options.projectRoot - Project root directory
 * @param {boolean} options.interactive - Whether to use interactive mode
 * @param {boolean} options.research - Whether to use research AI
 * @param {string} options.template - Template type to use ('standard', 'minimal', 'detailed')
 * @param {boolean} options.force - Whether to overwrite existing PRD
 */
export async function createPRD(projectDescription, outputPath, options = {}) {
	const {
		projectRoot = process.cwd(),
		interactive = false,
		research = false,
		template = 'standard',
		force = false
	} = options;

	try {
		log('info', `Creating PRD using AI assistance...`);
		
		// Check if file already exists
		if (existsSync(outputPath) && !force) {
			throw new Error(`PRD file already exists at ${outputPath}. Use --force to overwrite.`);
		}

		// Ensure output directory exists
		const outputDir = dirname(outputPath);
		if (!existsSync(outputDir)) {
			mkdirSync(outputDir, { recursive: true });
			log('info', `Created directory: ${outputDir}`);
		}

		// Get configuration for AI model
		const config = getConfig(projectRoot);
		
		// Load template
		const prdTemplate = loadPRDTemplate(template);
		
		// Create AI prompt
		const prompt = createPRDPrompt(projectDescription, prdTemplate, options);
		
		// Call AI to generate PRD
		const spinner = ora('Generating PRD with AI...').start();
		
		try {
			const aiResponse = await generateTextService(
				prompt,
				{
					provider: research ? 'research' : 'main',
					projectRoot,
					temperature: 0.3 // Lower temperature for more structured output
				}
			);

			spinner.succeed('PRD generated successfully!');

			// Process and format the response
			const formattedPRD = formatPRDResponse(aiResponse.text, projectDescription);

			// Write to file
			writeFileSync(outputPath, formattedPRD, 'utf8');
			
			log('info', `PRD saved to: ${outputPath}`);
			
			// Show next steps
			console.log(chalk.green('\n✅ PRD created successfully!'));
			console.log(chalk.blue('\nNext steps:'));
			console.log(chalk.cyan(`1. Review and edit the PRD at: ${outputPath}`));
			console.log(chalk.cyan(`2. Run: task-master parse-prd ${outputPath}`));
			console.log(chalk.cyan('3. Start implementing your tasks!'));

			return {
				success: true,
				path: outputPath,
				content: formattedPRD
			};

		} catch (aiError) {
			spinner.fail('Failed to generate PRD');
			throw aiError;
		}

	} catch (error) {
		log('error', `Error creating PRD: ${error.message}`);
		throw error;
	}
}

/**
 * Load PRD template based on type
 * @param {string} templateType - Type of template to load
 * @returns {string} Template content
 */
function loadPRDTemplate(templateType) {
	const templates = {
		minimal: `# Product Requirements Document

## Project Overview
[Brief description of the project]

## Core Features
[List main features]

## Technical Requirements
[Key technical details]

## Success Criteria
[How to measure success]`,

		standard: `# Product Requirements Document

## Overview
[Provide a high-level overview of your product here. Explain what problem it solves, who it's for, and why it's valuable.]

## Core Features
[List and describe the main features of your product. For each feature, include:
- What it does
- Why it's important
- How it works at a high level]

## User Experience
[Describe the user journey and experience. Include:
- User personas
- Key user flows
- UI/UX considerations]

## Technical Architecture
[Outline the technical implementation details:
- System components
- Data models
- APIs and integrations
- Infrastructure requirements]

## Development Roadmap
[Break down the development process into phases:
- MVP requirements
- Future enhancements
- Do not think about timelines whatsoever -- all that matters is scope and detailing exactly what needs to be build in each phase so it can later be cut up into tasks]

## Logical Dependency Chain
[Define the logical order of development:
- Which features need to be built first (foundation)
- Getting as quickly as possible to something usable/visible front end that works
- Properly pacing and scoping each feature so it is atomic but can also be built upon and improved as development approaches]

## Risks and Mitigations
[Identify potential risks and how they'll be addressed:
- Technical challenges
- Figuring out the MVP that we can build upon
- Resource constraints]

## Appendix
[Include any additional information:
- Research findings
- Technical specifications]`,

		detailed: `# Product Requirements Document

## Executive Summary
[Brief summary of the entire project]

## Problem Statement
[What problem are we solving?]

## Solution Overview
[High-level solution description]

## Target Audience
[Who will use this product?]

## User Stories
[Detailed user stories in "As a [user], I want [goal] so that [benefit]" format]

## Functional Requirements
[Detailed functional requirements]

## Non-Functional Requirements
[Performance, security, scalability requirements]

## Technical Specifications
[Detailed technical architecture]

## API Specifications
[If applicable, API endpoints and data structures]

## Database Design
[If applicable, database schema and relationships]

## Security Requirements
[Security considerations and requirements]

## Performance Requirements
[Performance benchmarks and requirements]

## Development Phases
[Detailed development roadmap with phases]

## Testing Strategy
[How the product will be tested]

## Deployment Strategy
[How the product will be deployed]

## Maintenance and Support
[Post-launch maintenance considerations]

## Success Metrics
[How success will be measured]

## Risks and Assumptions
[Potential risks and underlying assumptions]

## Appendices
[Additional technical details, research, etc.]`
	};

	return templates[templateType] || templates.standard;
}

/**
 * Create AI prompt for PRD generation
 * @param {string} projectDescription - User's project description
 * @param {string} template - Template to use
 * @param {Object} options - Additional options
 * @returns {string} Generated prompt
 */
function createPRDPrompt(projectDescription, template, options = {}) {
	const { research = false } = options;

	let prompt = `You are an expert product manager and technical architect. Your task is to create a comprehensive Product Requirements Document (PRD) based on the following project description.

PROJECT DESCRIPTION:
${projectDescription}

INSTRUCTIONS:
1. Use the provided template structure as a guide
2. Fill in all sections with detailed, actionable content
3. Be specific and technical where appropriate
4. Focus on creating clear requirements that can be translated into development tasks
5. Consider both technical and user experience aspects
6. Make sure the PRD is comprehensive enough to guide the entire development process

${research ? `
RESEARCH CONSIDERATIONS:
- Include current industry best practices
- Consider modern technology standards
- Reference relevant frameworks and tools
- Include security and performance considerations based on current standards
` : ''}

TEMPLATE STRUCTURE TO FOLLOW:
${template}

Please generate a complete PRD following this structure, replacing all placeholder text with detailed, project-specific content. Make sure each section is thoroughly filled out with actionable information.

IMPORTANT: 
- Do not include any markdown code blocks or formatting markers
- Write the PRD as plain markdown text
- Ensure all sections are comprehensive and detailed
- Focus on clarity and actionable requirements`;

	return prompt;
}

/**
 * Format the AI response into a proper PRD
 * @param {string} aiResponse - Raw AI response
 * @param {string} projectDescription - Original project description
 * @returns {string} Formatted PRD content
 */
function formatPRDResponse(aiResponse, projectDescription) {
	// Clean up the response
	let formatted = aiResponse.trim();
	
	// Remove any code block markers that might have been added
	formatted = formatted.replace(/```markdown\n?/g, '');
	formatted = formatted.replace(/```\n?/g, '');
	
	// Add a header comment with metadata
	const timestamp = new Date().toISOString().split('T')[0];
	const header = `<!-- 
Generated by Task Master AI on ${timestamp}
Original Description: ${projectDescription.replace(/\n/g, ' ').substring(0, 100)}${projectDescription.length > 100 ? '...' : ''}
-->

`;

	return header + formatted;
}