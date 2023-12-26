import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

function GoPage() {
    const params = useParams();
    const id = params.id;
    const firebase = useFirebase();
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        firebase.getUrl(id).then(urll=>setUrl(urll.originalUrl));
        if(url!=""){
          const isAbsoluteURL = (url) => url.startsWith('http://www.') || url.startsWith('https://www.');
          const absoluteLink = isAbsoluteURL(url) ? url : `https://www.${url}`;
          window.location.assign(absoluteLink);
          // window.location.href = `https://www.${url}`
          // console.log(absoluteLink)
        }
      }, [url]); 
  return (
    <div>
        <h2>Redirecting....</h2>
    </div>
  )
}

export default GoPage

