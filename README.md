# CRM Application

A modern Customer Relationship Management (CRM) web application built with React, Vite, Redux Toolkit, and Tailwind CSS.

## Features

- **User Authentication**: Login/signup with JWT token management
- **Role-based Dashboards**:
  - Admin dashboard with full access
  - Telecaller dashboard with restricted access
- **Leads Management**:
  - Create, view, update, and delete leads
  - Track lead status updates
  - Recent calls tracking
- **OAuth Integration**: Support for third-party authentication
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure
```bash
crm-app/
├── src/
│ ├── api/ # API service modules
│ ├── app/ # Redux store configuration
│ ├── assets/ # Static assets
│ ├── components/ # Reusable UI components
│ ├── features/ # Redux slices
│ ├── pages/ # Application pages
│ ├── index.css # Global styles
│ ├── main.jsx # Application entry point
│ └── App.jsx # Root component
├── vite.config.js # Vite configuration
└── vercel.json # Vercel deployment config
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to the CRM API backend

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sabaree-88/crm-app.git
cd crm-app
```
2. Install dependencies:
```bash
npm install
# or
yarn install
```
