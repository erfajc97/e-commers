import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getConfig from '../utils/getConfig';

const User = () => {
    const [user,setUser] = useState({})
     const navigate = useNavigate();

     const logout = () => {
       localStorage.setItem("token", "");
       navigate("/login/");
     };

    useEffect(()=>{

        if(localStorage.getItem('token')===""){
            getConfig();
        }else{

            axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/users/me", getConfig())
            .then(res => setUser(res.data))
            window.scrollTo(0, 0);
        }

    },[])

    // console.log(user);

    return (
      <div className="container_principal_user">
        <div className="link_logout" onClick={logout}>
          <i className="bx bx-user bx-lg"></i>
          <br />
          <h2>
            {" "}
            {user.firstName} {user.lastName}{" "}
          </h2>
          <br />
          <button className='btn_logout' onClick={logout}>Logout</button>
        </div>
      </div>
    );
};

export default User;