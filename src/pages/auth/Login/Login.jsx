import React, { useContext, useState } from 'react'
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios, { all } from 'axios';
import * as z from "zod";
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { authContext } from '../../../Context/AuthContext';

const defaultValues = {
  email: "",
  password: "",
}

const schema = z.object({
    email: z.email(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
    , "Invalid Password"),})

export default function Login() {
  const navigate = useNavigate();
  const {register ,handleSubmit ,formState:{errors ,touchedFields} ,setError} = useForm({defaultValues , mode:all , resolver:zodResolver(schema)});

  const {insertUserToken} = useContext(authContext);
  const [isLoading, setisLoading] = useState(false);


  async function onLogin(info) {
    setisLoading(true);

    try {
      const {data} = await axios.post("https://linked-posts.routemisr.com/users/signin" , info)
      console.log("info is : ",info);
      console.log("data is : ",data);
      console.log("token is : " ,data.token);

      insertUserToken(data.token);
      localStorage.setItem("token" , data.token)

      toast.success(data.message);
      navigate("/")
      setisLoading(false);
    }catch (e) {
      console.log(e.response.data.error);
      toast.error(e.response.data.error);
      setisLoading(false);
    }
    setisLoading(false);
    }

  return (
      <section className='py-12'>
        <div className="container">
          <div className="max-w-lg mx-auto p-8 rounded-xl shadow-lg text-black dark:text-white dark:shadow-gray-700 bg-blue-300 dark:bg-gray-800">
  
            <h1 className='text-center font-bold text-3xl pb-5 text-blue-950 dark:text-white'>Login</h1>
  
            <form 
            onSubmit={handleSubmit(onLogin)}
            className="flex flex-col gap-4">
              {/* Email------------------------------------------------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Your Email</Label>
                </div>
                <TextInput id="email" type="email" placeholder="name@gmail.com" shadow 
                {...register("email")} />
                {errors?.email && touchedFields?.email && <p className='text-red-600'>{errors?.email?.message}</p>}
              </div>
              {/* Passward------------------------------------------------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput id="password" type="password" placeholder=" ******** " shadow
                {...register("password")} />
                {errors?.password && touchedFields?.password && <p className='text-red-600'>{errors?.password?.message}</p>}
              </div>
              {/* Button------------------------------------------------------- */}
              <Button className='mt-2 bg-blue-500 dark:bg-blue-600 text-white' type="submit">
                {isLoading ? <i className='fa-solid fa-spin fa-spinner dark:text-white'></i>: "Log in"}
              </Button>
            </form> 
          </div>
        </div>
      </section>
  )
}
