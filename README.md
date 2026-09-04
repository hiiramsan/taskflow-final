# Taskflow

Taskflow is a simple task-management frontend built with React, TypeScript, Vite, and Material UI. It connects to the Taskflow API to organize work into projects and tasks.

## Features

- Register and sign in to an account
- Create, update, and delete projects
- Create, update, and delete tasks
- Set task status: To do, In progress, or Done
- Set task priority and due dates
- Search tasks and filter them by status or priority

## Getting started

Requirements: Node.js and a running Taskflow API.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

The API URL is configured in `src/types.ts`. Update it if your API is running somewhere other than the configured default.

## Basic manual

1. Create an account or sign in.
2. From the dashboard, select **New Project** and enter the project details.
3. Open a project and select **New task** to add work.
4. Use the status selector on a task to track progress.
5. Search by task name or use the status and priority filters to narrow the list.
6. Select a task to edit or delete it. Project actions are available at the top of the project page.

## Useful commands

```bash
npm run build   # Type-check and create a production build
npm run lint    # Run Oxlint
npm run preview # Preview the production build
```
