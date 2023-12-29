import React from 'react'
import { useFirebase } from '../context/Firebase'

function Login() {
    const firebase = useFirebase();
    
  return (
    <div>
      <button onClick={()=>firebase.loginSignupWithGoogle()}>Signup with google</button>
    </div>
  )
}

export default Login
