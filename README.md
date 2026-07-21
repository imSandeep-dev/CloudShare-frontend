# CloudShare - Frontend

CloudShare is a cloud-based file storage and sharing platform. This repository contains the frontend client, built with React.js, providing the user interface for authentication, file management, and subscription payments.

## Features

- **User Authentication** — Sign up / login flows integrated with Clerk
- **File Management UI** — Upload, view, organize, and delete files stored via Cloudinary
- **Subscription & Payments** — Razorpay checkout integration for premium plans
- **Responsive Design** — Works across desktop and mobile devices
- **Protected Routes** — Route guarding based on authenticated session state

## Tech Stack

- **Library:** React.js
- **Auth:** Clerk (React SDK)
- **Payments:** Razorpay Checkout
- **HTTP Client:** Axios / Fetch
- **Deployment:** Netlify
- **Backend:** [CloudShare Backend](#) — Spring Boot API (Cloudinary, Razorpay, JWT auth via MongoDB)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running instance of the [CloudShare backend](#)
- Clerk publishable API key
- Razorpay key ID (public/checkout key)

### Environment Variables

Create a `.env` file in the project root:

REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id

> Adjust variable prefixes (`REACT_APP_` / `VITE_`) depending on whether the project uses Create React App or Vite.

### Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/imSandeep-dev/CloudShare-frontend.git
cd cloudshare-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will run on `http://localhost:3000` by default.

### Build for Production

```bash
npm run build
```

This generates an optimized production build in the `build/` (or `dist/`) folder.

## Deployment

The frontend is deployed on **Netlify**.

- Set environment variables in the Netlify dashboard under **Site settings → Environment variables**
- Build command: `npm run build`
- Publish directory: `build` (or `dist` if using Vite)
- Ensure `REACT_APP_API_BASE_URL` points to the deployed backend URL on Railway, not `localhost`

## Project Structure

src/
├── components/ # Reusable UI components
├── pages/ # Route-level page components
├── hooks/ # Custom React hooks
├── services/ # API call wrappers (Axios instances, endpoints)
├── context/ # Auth/session context providers
├── assets/ # Images, icons, static assets
└── App.js

## Connecting to the Backend

Make sure the backend is running and `REACT_APP_API_BASE_URL` in your `.env` matches its address. CORS must be configured on the backend to allow requests from the frontend's origin (`localhost:3000` in dev, your Netlify domain in production).

## License

This project is for portfolio/educational purposes.