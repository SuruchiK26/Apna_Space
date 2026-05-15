# ApnaSpace - PG/Flat Discovery App

A full-stack React + Node.js application for finding PGs and flats with a complete user onboarding flow.

## Features

- **Optional Authentication**: Browse properties without signing up, login optional for additional features
- **Location-based Discovery**: Set location using GPS or manual entry (when authenticated)
- **Property Listings**: Browse PGs and flats with filtering
- **Responsive Design**: Mobile-first UI with Tailwind CSS


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

## Onboarding Flow



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
