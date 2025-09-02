import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function ChangePassword() {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const password =  useRef('') ;
    const newPassword = useRef('') ;
    console.log(password.current.value);
    
    async function changePassword() {
        return await  axios.patch(
            `https://linked-posts.routemisr.com/users/change-password`,
            
            {   password: password.current.value ,
                newPassword: newPassword.current.value ,
            }
            ,{headers: {token}}
        )}

        const {isLoading , mutate} = useMutation({
        mutationFn :changePassword ,
        onSuccess: (data)=>{
        console.log(data);
        toast.success(data?.data?.message || "Success");
        setToken(data?.data?.token);
        password.current.value='';
        newPassword.current.value='';
        },

        onError: (e)=>{
        console.log(e);
        toast.error(e?.response?.data?.message || "Failed");
        },
    })
  return (
      <section className='py-12'>
        <div className="container">
          <div className="max-w-lg mx-auto p-8 rounded-xl shadow-lg text-black dark:text-white dark:shadow-gray-700 bg-blue-300 dark:bg-gray-800">
  
            <h1 className='text-center font-bold text-3xl pb-5'>Change Password</h1>

            <form 
            className="flex flex-col gap-4">

              {/* Passward------------------------------------------------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Current Password</Label>
                </div>
                <input ref={password} id="password" type="password" placeholder=" ******** "
                className='rounded-lg w-full bg-white text-blue-700 dark:text-white dark:bg-gray-700 outline-sky-600 border-0'
                />
              </div>
              {/* Passward------------------------------------------------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPassword">New Password</Label>
                </div>
                <input ref={newPassword} id="newPassword" type="password" placeholder=" ******** "
                className='rounded-lg w-full bg-white text-blue-700 dark:text-white dark:bg-gray-700 outline-sky-600 border-0'
                 />
              </div>
              {/* Button------------------------------------------------------- */}
              <Button className='mt-2 cursor-pointer bg-blue-500 dark:bg-blue-600 text-white'  onClick={()=>mutate()}>
                {isLoading ? <i className='fa-solid fa-spin fa-spinner text-white'></i>: "Change"}
              </Button>
            </form> 
          </div>
        </div>
      </section>

  )
}
