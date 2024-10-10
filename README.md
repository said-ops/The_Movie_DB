# The Movie Database App

This is a front-end project for browsing movies using The Movie Database (TMDB) API. It allows users to search for movies, view details, watch trailers, and manage personalized watchlists by authenticating with Firebase.

## Features

- **Homepage**: Displays the top 100 movies of all time.
- **Search Page**: Search movies by name, filter by genre, and sort by year or rating.
- **Watchlist**: Users can sign in using Firebase Auth and manage their personalized watchlists, stored in Firestore.
- **Detail Page**: View detailed information about each movie including trailers, cast, and description.
- **Theme Support**: Toggle between light and dark themes for a personalized user experience.

## Screenshots

### Light Theme

![Light Theme Screenshot](/public/images/light.png)

### Dark Theme

![Dark Theme Screenshot](/public/images/dark.png)

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: State management for React.
- **Framer Motion**: For smooth and interactive animations.
- **Pure CSS**: For styling with support for both light and dark themes.
- **React Router**: For seamless navigation between different pages.
- **Firebase Auth**: For user authentication.
- **Firestore**: For storing and retrieving user watchlists.
- **TMDB API**: For fetching real-time movie data like ratings, trailers, and cast details.
- **Vite**: A fast front-end build tool.
- **Vercel**: Deployment platform.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine.
- **TMDB API Key**: You'll need an API key from [The Movie Database](https://www.themoviedb.org/).
- **Firebase Config**: Create a Firebase project and enable Firestore and Authentication. You'll need the Firebase config for your app.

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/said-ops/the_movie_db.git
   cd movie-database-app
2. Install dependencies::

   ```bash
   npm install
3. Create a .env file in the root directory and add your TMDB API key and Firebase config:
    ```bash
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key
    REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
4. Start the development server:
    ```bash
    npm run dev
5. Open your browser and go to http://localhost:5173.

