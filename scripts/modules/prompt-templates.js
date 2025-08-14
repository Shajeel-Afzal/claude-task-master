/**
 * prompt-templates.js
 * Predefined prompt templates for creating PRDs
 */

/**
 * Collection of PRD creation prompt templates
 */
export const PRD_TEMPLATES = {
	/**
	 * Web Application Template
	 */
	webApp: {
		name: 'Web Application',
		description: 'Template for web-based applications',
		prompts: [
			'What is the main purpose of your web application?',
			'Who are your target users?',
			'What key features should the application have?',
			'Do you need user authentication and accounts?',
			'What devices/browsers should it support?',
			'Do you need a database? What kind of data will you store?',
			'Should it be a single-page application (SPA) or multi-page?',
			'Do you need real-time features (chat, notifications, live updates)?',
			'What is your preferred technology stack?',
			'Do you need integration with external services or APIs?'
		]
	},

	/**
	 * Mobile Application Template
	 */
	mobileApp: {
		name: 'Mobile Application',
		description: 'Template for mobile applications',
		prompts: [
			'What problem does your mobile app solve?',
			'Is this for iOS, Android, or both platforms?',
			'Should it work offline? What features need offline support?',
			'Do you need user accounts and profiles?',
			'Will you use device features (camera, GPS, contacts, notifications)?',
			'Do you need a backend server or cloud services?',
			'How will users discover and download your app?',
			'Do you need in-app purchases or subscriptions?',
			'What\'s your app\'s core user flow (from open to main action)?',
			'Do you need social features or sharing capabilities?'
		]
	},

	/**
	 * API/Backend Service Template
	 */
	apiService: {
		name: 'API/Backend Service',
		description: 'Template for backend services and APIs',
		prompts: [
			'What is the primary purpose of your API?',
			'Who will consume your API (web apps, mobile apps, other services)?',
			'What data entities will your API manage?',
			'What are the core endpoints you need?',
			'Do you need authentication and authorization?',
			'What database will you use?',
			'Do you need real-time capabilities (WebSockets, Server-Sent Events)?',
			'What\'s your expected scale (users, requests per second)?',
			'Do you need to integrate with external APIs or services?',
			'What deployment platform will you use?'
		]
	},

	/**
	 * Data Analytics/Dashboard Template
	 */
	dashboard: {
		name: 'Data Analytics Dashboard',
		description: 'Template for analytics and dashboard applications',
		prompts: [
			'What data sources will your dashboard connect to?',
			'Who are the users and what are their roles?',
			'What key metrics and KPIs should be displayed?',
			'Do you need real-time data updates?',
			'What types of charts and visualizations do you need?',
			'Should users be able to customize views?',
			'Do you need data filtering and search capabilities?',
			'Should users be able to export data or reports?',
			'Do you need alerts or notifications for certain conditions?',
			'What level of data drill-down is required?'
		]
	},

	/**
	 * E-commerce Platform Template
	 */
	ecommerce: {
		name: 'E-commerce Platform',
		description: 'Template for e-commerce and marketplace applications',
		prompts: [
			'What products or services will you sell?',
			'Is this B2C, B2B, or a marketplace?',
			'Do you need user accounts and profiles?',
			'What payment methods should you support?',
			'Do you need inventory management?',
			'What shipping and fulfillment options do you need?',
			'Do you need product reviews and ratings?',
			'Should you have shopping cart and wishlist features?',
			'Do you need admin tools for managing products and orders?',
			'What marketing features do you need (coupons, promotions)?'
		]
	},

	/**
	 * Content Management System Template
	 */
	cms: {
		name: 'Content Management System',
		description: 'Template for CMS and content-focused applications',
		prompts: [
			'What types of content will be managed?',
			'Who are the content creators and what are their roles?',
			'Do you need a visual editor or markdown support?',
			'Should content support multimedia (images, videos, documents)?',
			'Do you need content workflow and approval processes?',
			'Should content be published immediately or scheduled?',
			'Do you need SEO features and meta data management?',
			'Should there be commenting or user interaction features?',
			'Do you need content versioning and revision history?',
			'What content organization features do you need (categories, tags)?'
		]
	},

	/**
	 * IoT/Hardware Integration Template
	 */
	iot: {
		name: 'IoT/Hardware Integration',
		description: 'Template for IoT and hardware-connected applications',
		prompts: [
			'What IoT devices or sensors will connect to your system?',
			'What data will the devices collect?',
			'How will devices communicate (WiFi, Bluetooth, cellular)?',
			'Do you need real-time monitoring and alerts?',
			'Should users be able to control devices remotely?',
			'Do you need device management and configuration features?',
			'What data storage and analytics capabilities are needed?',
			'Do you need mobile apps for device interaction?',
			'Should the system work offline when internet is unavailable?',
			'What security measures are needed for device communication?'
		]
	},

	/**
	 * Generic/Custom Template
	 */
	generic: {
		name: 'Custom Project',
		description: 'General template for any type of project',
		prompts: [
			'What is the main problem your project solves?',
			'Who are your target users or customers?',
			'What are the core features your project must have?',
			'What technologies or platforms do you want to use?',
			'Do you have any existing systems to integrate with?',
			'What are your main technical constraints or requirements?',
			'How will users interact with your project?',
			'What does success look like for this project?',
			'Are there any similar projects you want to reference?',
			'What is your timeline and priority for different features?'
		]
	}
};

/**
 * Get a list of available template names and descriptions
 * @returns {Array} Array of template objects with name and description
 */
export function getAvailableTemplates() {
	return Object.entries(PRD_TEMPLATES).map(([key, template]) => ({
		key,
		name: template.name,
		description: template.description
	}));
}

/**
 * Get prompts for a specific template
 * @param {string} templateKey - The template key (e.g., 'webApp', 'mobileApp')
 * @returns {Object|null} Template object or null if not found
 */
export function getTemplate(templateKey) {
	return PRD_TEMPLATES[templateKey] || null;
}

/**
 * Create a guided PRD creation prompt based on template responses
 * @param {string} templateKey - The template to use
 * @param {Array} responses - Array of responses to the template prompts
 * @returns {string} Generated description for PRD creation
 */
export function createGuidedDescription(templateKey, responses) {
	const template = getTemplate(templateKey);
	if (!template) {
		throw new Error(`Template '${templateKey}' not found`);
	}

	if (responses.length !== template.prompts.length) {
		throw new Error(`Expected ${template.prompts.length} responses, got ${responses.length}`);
	}

	// Create a comprehensive description based on responses
	let description = `${template.name} Project:\n\n`;
	
	template.prompts.forEach((prompt, index) => {
		if (responses[index] && responses[index].trim()) {
			description += `${prompt}\n${responses[index]}\n\n`;
		}
	});

	return description.trim();
}

/**
 * Interactive prompt gathering for a template
 * @param {string} templateKey - The template to use
 * @param {Function} promptFunction - Function to prompt user (e.g., inquirer.prompt)
 * @returns {Promise<Array>} Array of responses
 */
export async function gatherTemplateResponses(templateKey, promptFunction) {
	const template = getTemplate(templateKey);
	if (!template) {
		throw new Error(`Template '${templateKey}' not found`);
	}

	const responses = [];
	
	for (let i = 0; i < template.prompts.length; i++) {
		const prompt = template.prompts[i];
		const answer = await promptFunction({
			type: 'input',
			name: 'response',
			message: `${i + 1}. ${prompt}`,
			validate: (input) => input.trim().length > 0 || 'Please provide a response'
		});
		responses.push(answer.response);
	}

	return responses;
}