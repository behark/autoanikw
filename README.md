# Autoani Windsurf

A luxury automotive marketplace application built with Next.js frontend and Node.js/Express backend.

## Project Structure

- `frontend/` - Next.js web application
  - Features vehicle listings, services pages, and admin dashboard
  - Responsive design for all device types
  
- `backend/` - Express.js API server
  - RESTful API for vehicle management
  - File upload middleware for vehicle images
  - MongoDB database integration

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/behark/autoanikw.git
   cd autoanikw
   ```

2. Install and build the backend:

   ```bash
   cd backend
   npm install
   npm run build
   ```

3. Install and build the frontend:

   ```bash
   cd ../frontend/autoani
   npm install
   npm run build
   ```

### Development

- To run the backend server:

  ```bash
  cd backend
  npm run dev
  ```

- To run the frontend development server:

  ```bash
  cd frontend/autoani
  npm run dev
  ```

### Production

- Both frontend and backend can be deployed separately
- The project includes Netlify configuration for frontend deployment

## Features

- Vehicle listings with detailed information
- Admin dashboard for vehicle management
- Contact and services information pages
- Responsive design
