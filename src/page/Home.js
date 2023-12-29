
import { useState } from 'react';
// import { useFirebase } from './context/Firebase';
import { useFirebase } from '../context/Firebase';
import {useNavigate} from 'react-router-dom'
function Home() {
  const firebase = useFirebase();
  const [url, setUrl] = useState("");
    const navigate = useNavigate();
  const handelPutData = () => {
    firebase.putData(url)
  }
  const handelClick = () =>{
    navigate('/allUrls')
  }
  return (
    <div>
      <h2>Url Shortner</h2>
      <input onChange={(e)=>setUrl(e.target.value)} value={url} type="text" placeholder='Enter Url'/>

      <button onClick={handelPutData}>Put Data</button>
      <button onClick={handelClick}>Read Data</button>
      <button onClick={()=>firebase.loginSignupWithGoogle()}>Login</button>

    </div>
  );
}

export default Home;
