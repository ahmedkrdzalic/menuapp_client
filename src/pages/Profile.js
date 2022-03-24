import React, {useContext} from 'react'
import {useState, useEffect} from "react"
import axios from "axios";
import {LoginContext} from "../helpers/LoginContext";


function Profile() {
    const [profile, setProfile] = useState({}); 
    const {user} = useContext(LoginContext);


    useEffect(() => {
        axios.get(`http://localhost:3001/user/profile`, {
            params: {
                userId: user.id
                //stavit pravi id usera iz state managementa CONTEXT
            },
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                setProfile(response.data);
            }
        );

    }, []);

  return (
    <div>
        <h3>Username: {profile.username}</h3>
        
    </div>
  )
}

export default Profile