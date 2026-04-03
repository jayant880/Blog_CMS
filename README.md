# Blog CMS

A full-stack Blog Content Management System built with React, Node.js (Express), and MongoDB.

## Project Structure

- `backend/`: Node.js Express server with TypeScript and Mongoose.
- `frontend/`: React application with Vite, TailwindCSS, and React Router.

## Getting Started

This project is set up as an npm monorepo (workspaces) to manage both the frontend and backend together.

### Prerequisites

- Node.js
- MongoDB URI

### Installation & Local Development

1. Install dependencies for all workspaces from the root directory:
   ```bash
   npm install
   ```
2. Create a `.env` file in the `backend` directory based on `.env.example` and add your MongoDB URI:
   ```bash
   cp backend/.env.example backend/.env
   ```
3. Start both the frontend and backend servers concurrently from the root directory:
   ```bash
   npm run dev
   ```

## Vercel Deployment

This repository is optimized for zero-config Vercel deployment as a monorepo.

1. Import the project into Vercel.
2. The **Framework Preset** should automatically be detected as `Vite`.
3. Leave the **Root Directory** empty (set to project root).
4. Set the **Output Directory** to `frontend/dist`.
5. Ensure your environment variables (like `DATABASE_URI` and any `JWT_SECRET`) are added in the Vercel dashboard.
6. Deploy! Vercel will use the root `package.json` to build the frontend, and it will automatically deploy the Express server as a serverless function by utilizing the `api/index.ts` file and `vercel.json` routing.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS 4.0, Axios, React Router 7.
- **Backend**: Node.js, Express 5.0, TypeScript, Mongoose, tsx.
- **Database**: MongoDB.
