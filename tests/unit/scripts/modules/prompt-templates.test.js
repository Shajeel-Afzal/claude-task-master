/**
 * prompt-templates.test.js
 * Tests for the prompt templates functionality
 */

import { beforeEach, describe, test, expect } from '@jest/globals';
import { 
	getAvailableTemplates, 
	getTemplate, 
	createGuidedDescription,
	PRD_TEMPLATES
} from '../../../../scripts/modules/prompt-templates.js';

describe('Prompt Templates', () => {
	describe('getAvailableTemplates', () => {
		test('should return all available templates', () => {
			const templates = getAvailableTemplates();
			
			expect(templates).toBeInstanceOf(Array);
			expect(templates.length).toBeGreaterThan(0);
			
			// Check that each template has required properties
			templates.forEach(template => {
				expect(template).toHaveProperty('key');
				expect(template).toHaveProperty('name');
				expect(template).toHaveProperty('description');
			});
		});

		test('should include expected template types', () => {
			const templates = getAvailableTemplates();
			const templateKeys = templates.map(t => t.key);
			
			expect(templateKeys).toContain('webApp');
			expect(templateKeys).toContain('mobileApp');
			expect(templateKeys).toContain('apiService');
			expect(templateKeys).toContain('generic');
		});
	});

	describe('getTemplate', () => {
		test('should return template for valid key', () => {
			const template = getTemplate('webApp');
			
			expect(template).not.toBeNull();
			expect(template).toHaveProperty('name');
			expect(template).toHaveProperty('description');
			expect(template).toHaveProperty('prompts');
			expect(template.prompts).toBeInstanceOf(Array);
			expect(template.prompts.length).toBeGreaterThan(0);
		});

		test('should return null for invalid key', () => {
			const template = getTemplate('invalidTemplate');
			expect(template).toBeNull();
		});

		test('should return template with correct structure', () => {
			const template = getTemplate('mobileApp');
			
			expect(template.name).toBe('Mobile Application');
			expect(template.description).toContain('mobile');
			expect(template.prompts).toBeInstanceOf(Array);
			
			// Check that prompts are strings
			template.prompts.forEach(prompt => {
				expect(typeof prompt).toBe('string');
				expect(prompt.length).toBeGreaterThan(0);
			});
		});
	});

	describe('createGuidedDescription', () => {
		test('should create description from template and responses', () => {
			// Get the webApp template to know how many prompts it has
			const template = getTemplate('webApp');
			
			// Create responses array matching the template's prompt count
			const responses = new Array(template.prompts.length).fill('').map((_, index) => {
				const responses = [
					'Task management web application',
					'Small teams and freelancers',
					'Task creation, assignment, and tracking',
					'Yes, user accounts required',
					'Desktop and mobile browsers',
					'PostgreSQL database for user data and tasks',
					'Single-page application using React',
					'Yes, real-time updates for collaborative features',
					'React, Node.js, PostgreSQL, WebSocket',
					'Yes, integrate with Slack and Google Calendar'
				];
				return responses[index] || `Response ${index + 1}`;
			});
			
			const description = createGuidedDescription('webApp', responses);
			
			expect(description).toContain('Web Application Project:');
			expect(description).toContain('Task management web application');
			expect(description).toContain('Small teams and freelancers');
		});

		test('should throw error for invalid template', () => {
			const responses = ['test response'];
			
			expect(() => {
				createGuidedDescription('invalidTemplate', responses);
			}).toThrow("Template 'invalidTemplate' not found");
		});

		test('should throw error for mismatched response count', () => {
			const responses = ['only one response'];
			
			expect(() => {
				createGuidedDescription('webApp', responses);
			}).toThrow('Expected');
		});

		test('should handle empty responses gracefully', () => {
			const template = getTemplate('generic');
			const responses = new Array(template.prompts.length).fill('');
			
			const description = createGuidedDescription('generic', responses);
			
			expect(description).toContain('Custom Project Project:');
			// Should not contain empty response sections
			expect(description.split('\n\n').length).toBeLessThan(template.prompts.length * 2);
		});
	});

	describe('Template Content Quality', () => {
		test('all templates should have reasonable number of prompts', () => {
			Object.entries(PRD_TEMPLATES).forEach(([key, template]) => {
				expect(template.prompts.length).toBeGreaterThanOrEqual(5);
				expect(template.prompts.length).toBeLessThanOrEqual(15);
			});
		});

		test('all template prompts should end with question marks', () => {
			Object.entries(PRD_TEMPLATES).forEach(([key, template]) => {
				template.prompts.forEach(prompt => {
					expect(prompt).toMatch(/\?$/);
				});
			});
		});

		test('web app template should have relevant prompts', () => {
			const template = getTemplate('webApp');
			const promptsText = template.prompts.join(' ').toLowerCase();
			
			expect(promptsText).toContain('web');
			expect(promptsText).toContain('user');
			expect(promptsText).toContain('feature');
		});

		test('mobile app template should have mobile-specific prompts', () => {
			const template = getTemplate('mobileApp');
			const promptsText = template.prompts.join(' ').toLowerCase();
			
			expect(promptsText).toContain('mobile');
			expect(promptsText).toContain('platform');
			expect(promptsText).toContain('offline');
		});

		test('API service template should have backend-specific prompts', () => {
			const template = getTemplate('apiService');
			const promptsText = template.prompts.join(' ').toLowerCase();
			
			expect(promptsText).toContain('api');
			expect(promptsText).toContain('endpoint');
			expect(promptsText).toContain('database');
		});
	});
});