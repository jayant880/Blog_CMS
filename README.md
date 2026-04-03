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

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS 4.0, Axios, React Router 7.
- **Backend**: Node.js, Express 5.0, TypeScript, Mongoose, tsx.
- **Database**: MongoDB.
