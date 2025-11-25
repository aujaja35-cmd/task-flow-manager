Group 9 Simple Task Manager Application

A comprehensive task management web application built with React, TypeScript, and modern web technologies. This application provides a complete solution for managing tasks with features like priority levels, categories, filtering, and persistent storage.

Table of Contents
	•	Features￼
	•	System Requirements￼
	•	Installation￼
	•	Running the Application￼
	•	Project Structure￼
	•	Usage Guide￼
	•	Data Storage￼
	•	Technologies Used￼
	•	Development￼

Features

Core Features
	•	Task CRUD Operations: Create, Read, Update, and Delete tasks
	•	Task Status Management: Mark tasks as pending or completed
	•	Auto-generated IDs: Unique identifier for each task
	•	Task Descriptions: Add detailed descriptions for each task
	•	Due Dates: Optional due date assignment for tasks
	•	Persistent Storage: Tasks saved in browser’s local storage

Enhanced Features
	•	Priority Levels: High, Medium, and Low priority classification
	•	Categories: Organize tasks by Work, Personal, Shopping, Health, Education, or Other
	•	Advanced Filtering: Filter tasks by status, priority, and category
	•	Search Functionality: Search tasks by description
	•	Task Statistics: Dashboard showing total, completed, pending, and high-priority tasks
	•	Overdue Detection: Automatic identification of overdue tasks
	•	Sort Options: Automatic sorting by status, priority, and due date
	•	Input Validation: Comprehensive validation for task creation and editing
	•	Responsive Design: Works seamlessly on desktop, tablet, and mobile devices

System Requirements
	•	Node.js (version 16.0 or higher)
	•	npm (version 7.0 or higher) or Bun
	•	Modern web browser (Chrome, Firefox, Safari, or Edge)
	•	100MB free disk space

Installation
	1.	Clone or download the project

git clone <repository-url>
cd group9-task-manager


	2.	Install dependencies

npm install

Or if using Bun:

bun install



Running the Application

Development Mode

Start the development server with hot-reload:

npm run dev

Or with Bun:

bun run dev

The application will be available at http://localhost:8080

Production Build

Build the application for production:

npm run build

Preview the production build:

npm run preview

Project Structure

group9-task-manager/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── TaskForm.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskFilters.tsx
│   │   └── TaskStats.tsx
│   ├── lib/
│   │   ├── taskStorage.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── task.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── hooks/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md

Usage Guide

Creating a Task
	1.	Click the “New Task” button in the header
	2.	Enter a task description (required, max 200 characters)
	3.	Select priority level (High, Medium, or Low)
	4.	Choose a category
	5.	Optionally set a due date
	6.	Click “Add Task” to create

Viewing Tasks
	•	All tasks are displayed in the main view
	•	Tasks are automatically sorted by status, priority, and due date
	•	View statistics at the top showing task counts and metrics

Filtering Tasks

Use the filter bar to:
	•	Search tasks by description
	•	Filter by status (All, Pending, Completed)
	•	Filter by priority level
	•	Filter by category

Editing a Task
	1.	Click the edit button on any task
	2.	Modify the task details in the form
	3.	Click “Update Task” to save changes

Completing a Task
	•	Click the checkbox next to a task to mark it as completed
	•	Click again to mark it as pending

Deleting a Task
	•	Click the delete button on any task
	•	The task will be permanently removed

Data Storage

The application uses browser’s Local Storage for data persistence:
	•	Tasks are stored in JSON format
	•	Data persists across browser sessions
	•	Storage key: group9_tasks
	•	Maximum storage: ~5-10MB (browser dependent)

Note: Clearing browser data will delete all tasks. For production use, consider implementing server-side storage.

Technologies Used
	•	React 18
	•	TypeScript
	•	Vite
	•	Tailwind CSS
	•	React Router
	•	Local Storage API

Development

Code Structure

The application follows modern React best practices:
	•	Component-based architecture: Reusable, modular components
	•	TypeScript for type safety: Comprehensive type definitions
	•	Custom hooks: Reusable stateful logic
	•	Utility functions: Separated business logic
	•	CSS variables: Consistent theming system

Key Components
	1.	TaskForm: Handles task creation and editing with validation
	2.	TaskList: Renders the list of tasks with sorting
	3.	TaskItem: Individual task card with actions
	4.	TaskFilters: Provides filtering and search controls
	5.	TaskStats: Displays aggregated task statistics

Storage Functions

Located in src/lib/taskStorage.ts:
	•	getTasks(): Retrieve all tasks
	•	addTask(): Create a new task
	•	updateTask(): Update existing task
	•	deleteTask(): Remove a task
	•	completeTask(): Mark task as completed
	•	getTaskStats(): Calculate statistics

Academic Context

This project was developed as part of an academic assignment with the following objectives:
	•	Demonstrate proficiency in React and TypeScript
	•	Implement CRUD operations with persistent storage
	•	Apply modern web development best practices
	•	Create a user-friendly, responsive interface
	•	Document code and project structure comprehensively

License

This project is submitted as academic work for Group 9.

Contributing

This is an academic project. For questions or suggestions, please contact the project team.

⸻

Group 9 Simple Task Manager Application - Built with React, TypeScript, and dedication to quality.


