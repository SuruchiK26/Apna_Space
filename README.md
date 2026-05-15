# ApnaSpace - PG/Flat Discovery App

A full-stack React + Node.js application for finding PGs and flats with a complete user onboarding flow.

## Features

- **Optional Authentication**: Browse properties without signing up, login optional for additional features
- **Location-based Discovery**: Set location using GPS or manual entry (when authenticated)
- **Property Listings**: Browse PGs and flats with filtering
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Protected Routes**: Certain features require authentication (adding properties, setting location)

## Tech Stack

### Frontend
- React 19 with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Onboarding Flow

1. **App Load**: Check if user is authenticated
   - If not authenticated → Redirect to `/register`
   - If authenticated but no location set → Redirect to `/set-location`
   - If authenticated and location set → Redirect to `/home`

2. **Registration** (`/register`):
   - Collect name, email, password
   - Create user account in MongoDB
   - Generate JWT token
   - Redirect to `/login`

3. **Login** (`/login`):
   - Collect email, password
   - Validate credentials
   - Store JWT token in localStorage
   - Check location status and redirect accordingly

4. **Set Location** (`/set-location`):
   - Option to use current GPS location
   - Option to manually enter location
   - Save location (lat, lng, address) to user profile
   - Redirect to `/home`

5. **Home** (`/home`):
   - Display current location
   - Show property listings
   - Allow location changes and logout

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/location` - Set user location (protected)
- `GET /api/auth/me` - Get current user info (protected)

### Properties
- `GET /api/property/list` - Get all properties
- `GET /api/property/nearby` - Get nearby properties

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd apnaspace
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with:
   # MONGO_URI=mongodb://localhost:27017/apnaspace
   # JWT_SECRET=your-secret-key
   # PORT=5000
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open browser**
   - Frontend: http://localhost:5176
   - Backend: http://localhost:5000

## Project Structure

```
apnaspace/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── public/
└── README.md
```

## Key Components

- **AuthProvider**: Manages authentication state and API calls
- **ProtectedRoute**: Guards routes based on auth/location status
- **Register/Login/SetLocation**: Onboarding flow pages
- **Home**: Main property discovery page

## Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- Input validation and error handling

## Future Enhancements

- Google Maps integration for property locations
- Advanced search and filtering
- User profiles and favorites
- Property owner dashboard
- Payment integration for bookings