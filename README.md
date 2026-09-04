# Taskflow

Taskflow is a simple task-management frontend built with React, TypeScript, Vite, and Material UI. It connects to the Taskflow API to organize work into projects and tasks.

## Demo

Try the deployed application at [https://hiiramsan.github.io/taskflow-final/](https://hiiramsan.github.io/taskflow-final/).

The frontend uses the deployed Taskflow API by default in production. A different API can be configured with the `VITE_API_URL` environment variable.

## Features

- Register and sign in to an account
- Create, update, and delete projects
- Create, update, and delete tasks
- Set task status: To do, In progress, or Done
- Set task priority and due dates
- Search tasks and filter them by status or priority

## Setup

### Requirements

- Node.js 20 or newer
- npm
- A running Taskflow API for local development

### Install and run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

### Environment variables

Create a `.env.local` file in the project root when the API is not available at the default URL:

```bash
VITE_API_URL=http://localhost:3000
```

Use `.env.example` as a starting point. Vite only exposes variables prefixed with `VITE_` to the browser, so do not place secrets in this file.

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

## Project structure

```text
src/
├── components/       Reusable project and task UI
├── config/            Runtime configuration such as the API URL
├── context/           Global authentication state
├── hooks/             Data-fetching and mutation hooks
├── pages/             Route-level screens
├── services/         API clients for auth, projects, and tasks
├── App.tsx            Application routes and providers
├── AppLayout.tsx      Authenticated application shell
├── types.ts           Shared domain types and token storage key
└── index.css         Global styles
```

The application separates view components from API access: pages compose hooks, hooks manage loading and mutation state, and services contain the HTTP requests. Authentication tokens are stored in `localStorage` under the `taskflow-auth-token` key.

## Tech stack

- React 19 and TypeScript
- Vite
- React Router
- Material UI and Tailwind CSS
- Axios
