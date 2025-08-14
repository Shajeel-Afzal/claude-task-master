# PRD Creation Prompts for Task Master

This document contains ready-to-use prompts for creating Product Requirements Documents (PRDs) with Task Master AI assistants.

## How to Use These Prompts

You can use these prompts directly with AI assistants that have access to Task Master tools:

1. **Copy a prompt below**
2. **Replace the placeholder information** with your project details
3. **Send the prompt to your AI assistant**

The AI will use the `create-prd` tool to generate a comprehensive PRD automatically.

---

## Web Application Prompts

### General Web App
```
Can you create a PRD for a web application with the following details:
- Purpose: [Describe what your web app does]
- Target Users: [Who will use it]
- Key Features: [List 3-5 main features]
- Technology Preferences: [Any specific tech stack preferences]

Please use the create-prd tool with research enabled to generate a comprehensive PRD.
```

### SaaS Platform
```
Please create a PRD for a SaaS platform with these requirements:
- Industry: [Healthcare/Finance/Education/etc.]
- Problem it solves: [Specific problem]
- User types: [Different user roles]
- Revenue model: [Subscription/per-use/etc.]
- Integration needs: [APIs, third-party services]

Use the detailed template and research AI for the most comprehensive PRD.
```

### E-commerce Site
```
I need a PRD for an e-commerce website:
- Products: [What you're selling]
- Target market: [Who your customers are]
- Special features: [Unique selling points]
- Payment requirements: [Payment methods needed]
- Shipping considerations: [Fulfillment approach]

Please use create-prd with the detailed template and research.
```

---

## Mobile Application Prompts

### Consumer Mobile App
```
Create a PRD for a mobile application:
- App category: [Social/Productivity/Entertainment/etc.]
- Core functionality: [Main purpose of the app]
- Target platforms: [iOS/Android/both]
- Offline capabilities: [What works without internet]
- Monetization: [Free/paid/freemium/ads]

Use create-prd with research to include current mobile best practices.
```

### Business Mobile App
```
Please generate a PRD for a business mobile application:
- Business problem: [What business need it addresses]
- User workflow: [How users will interact with it]
- Device features needed: [Camera/GPS/notifications/etc.]
- Backend requirements: [Data sync/user management/etc.]
- Security requirements: [Any special security needs]

Use the create-prd tool with detailed template and research enabled.
```

---

## API/Backend Service Prompts

### REST API
```
I need a PRD for a REST API service:
- Data domain: [What type of data it manages]
- API consumers: [Who/what will use the API]
- Key endpoints: [Main operations needed]
- Authentication: [How API access is controlled]
- Scale requirements: [Expected usage volume]

Please use create-prd with research for current API best practices.
```

### Microservice
```
Create a PRD for a microservice:
- Service responsibility: [Single responsibility of this service]
- Integration points: [How it connects to other services]
- Data storage: [Database/storage requirements]
- Communication patterns: [Async/sync, message queues, etc.]
- Monitoring needs: [Logging, metrics, health checks]

Use create-prd with detailed template and research.
```

---

## Data & Analytics Prompts

### Dashboard Application
```
Generate a PRD for a data dashboard:
- Data sources: [Where data comes from]
- Key metrics: [What KPIs to display]
- User roles: [Different types of users]
- Visualization types: [Charts, graphs, tables needed]
- Real-time requirements: [How current data needs to be]

Please use create-prd with research for modern dashboard practices.
```

### Analytics Platform
```
Create a PRD for an analytics platform:
- Data types: [What kind of data to analyze]
- Analysis features: [Reporting, predictive, real-time]
- Integration requirements: [Data import/export needs]
- User experience: [Technical vs non-technical users]
- Compliance needs: [Privacy, security regulations]

Use create-prd with detailed template and research enabled.
```

---

## AI/ML Application Prompts

### AI-Powered Tool
```
I need a PRD for an AI-powered application:
- AI capability: [What the AI does - classification/generation/prediction/etc.]
- Input data: [What data the AI processes]
- Output format: [How results are presented]
- Training requirements: [Model training and updates]
- User interaction: [How users work with AI features]

Please use create-prd with research to include current AI best practices.
```

### Machine Learning Platform
```
Create a PRD for an ML platform:
- ML use cases: [Types of models to support]
- Data pipeline: [How data flows through the system]
- Model lifecycle: [Training, deployment, monitoring]
- User types: [Data scientists, engineers, business users]
- Infrastructure: [Cloud, on-premise, hybrid]

Use create-prd with detailed template and research for comprehensive coverage.
```

---

## Interactive Prompts

### Guided Template Selection
```
I want to create a PRD but I'm not sure which template to use. Can you help me with the guided template process? 

Please suggest the most appropriate guided template based on my project type: [briefly describe your project]
```

### Full Interactive Mode
```
I'd like to create a comprehensive PRD interactively. Can you walk me through the process step by step to ensure I don't miss any important details?

My project is: [brief description]
```

---

## Quick Start Prompts

### Minimal Viable Product (MVP)
```
Create a minimal PRD for an MVP:
- Core problem: [One main problem to solve]
- Target user: [Primary user type]
- Key feature: [One essential feature]
- Success metric: [How to measure success]

Use create-prd with minimal template for a focused PRD.
```

### Proof of Concept
```
I need a PRD for a proof of concept:
- Technology to prove: [New tech or approach to validate]
- Success criteria: [What would prove it works]
- Scope limitations: [What's excluded from POC]
- Timeline: [How long to validate]

Please use create-prd with minimal template and research.
```

---

## Tips for Better PRDs

When using these prompts:

1. **Be specific** - The more details you provide, the better the PRD
2. **Use research mode** - Add "with research enabled" for current best practices
3. **Choose the right template** - Minimal for simple projects, detailed for complex ones
4. **Iterate** - You can always update the PRD with new information using `update-task`

## Next Steps After PRD Creation

After your PRD is created:

1. **Review the generated PRD** - Make any necessary edits
2. **Parse into tasks** - Use `parse-prd` to generate development tasks
3. **Start building** - Begin implementing your project with clear direction!