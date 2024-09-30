import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; 

function ProtectedRoute({children}) {

    const [user] = useAuthState(auth);

  return user? children : <Navigate to={'/Sign-In'}/>
}

export default ProtectedRoute