# QR Event Management System Frontend

A modern web application for managing event attendance using QR codes. This system provides an intuitive interface for event management, user registration, and QR code-based attendance tracking.

<a href="https://qrcode-frontend-lovat.vercel.app" target="_blank">Live Here</a>

## Features

### For Administrators

- Create, update, and delete events
- Access a dedicated admin dashboard
- Real-time QR code scanning for attendance tracking
- View attendance reports and event statistics

### For Users

- Browse available upcoming events
- Register/unregister for events
- Receive unique QR codes for registered events
- View personal event history and attendance records

## Technology Stack

- **React**: Frontend library for building user interfaces
- **TanStack Query**: Data synchronization and state management
- **React Hook Form**: Form validation and handling
- **Shadcn UI**: Modern UI component library
- **React Router**: Client-side routing
- **Encrypt Storage**: Secure JWT token storage
- **Axios**: HTTP client for API requests

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone git@github.com:nuru484/qrcode-frontend.git
cd rcode-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:

```env
VITE_SERVER_URL = 'the_backend_url'
VITE_STORAGE_ENCRYPTION_KEY  = 'your_storage_encryption_key'
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── api/          # API service functions
├── components/    # Reusable UI components
├── pages/         # Page components and routes
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── contexts/      # React context providers
├── routes/        # TypeScript type definitions
```

## Key Features Implementation

### Secure Authentication

- JWT-based authentication
- Encrypted token storage using encrypt-storage
- Protected routes for admin and user areas

### Event Management

- CRUD operations for events
- Date validation for preventing past event registration
- Real-time data updates using TanStack Query

### QR Code System

- Unique QR code generation for each registration
- QR code scanner integration for attendance tracking
- Real-time attendance status updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- All sensitive data is encrypted using encrypt-storage
- JWT tokens are stored securely
- API requests are protected with authentication headers
- Form inputs are validated and sanitized
