import axios from 'axios';
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';

export const authContext = createContext();

export default function AuthContextProvider({children}) {

    const [token, setToken] = useState(null);

    const [UserData, setUserData] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setToken(localStorage.getItem("token"));
        }
    },[]);

    useEffect(() => {
        if (token != null) {
            getUserDataApi();
        }
    },[token]);

    function insertUserToken(newToken) {
        setToken(newToken);
    }
    function signOut() {
        localStorage.removeItem("token");
        setToken(null);
        setUserData(null);
    }
    async function getUserDataApi() {
        const response = await axios.get(`https://linked-posts.routemisr.com/users/profile-data` , {
                headers:{token}
            })
        if (response.data?.message === "success") {
            setUserData(response.data.user)
        }   
    }
    console.log("token is : " ,token);
  return (
    <authContext.Provider value={{
        token , insertUserToken, signOut , UserData , setUserData , getUserDataApi
    }}>
        {children}
    </authContext.Provider>
  );
};
