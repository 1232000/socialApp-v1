import React, { useState } from 'react'
import { Radio } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from "zod";
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues = {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    }
const schema = z.object({
  name: z.string().min(3 , "Name must be 3–30 characters").max(30 , "Name must be 3–30 characters"),

  email: z.email(),

  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Password must contain at least 8 characters,one uppercase letter, one lowercase letter, one number and one special character"),
  rePassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Confirm Password must match the password entered above."),

  dateOfBirth: z.coerce.date().refine(
    function(value){
      const currentYear = new Date().getFullYear();
      const userYear = value.getFullYear();
      if (currentYear - userYear >= 18) {
        return true ;
      }
      return false ;
    }, "You must be +18"),

  gender: z.enum(["female" , "male"]) ,})
  
  .refine(function(values){
    
  if (values.password === values.rePassword) {
    return true;
  }return false;
} , {message:"Confirm Password must match the password entered above." , path: ["rePassword"],} )

export default function Register() {
  const navigate = useNavigate();
  const {register ,handleSubmit ,formState:{errors ,touchedFields} ,setError} = useForm({defaultValues , mode:"all" , resolver:zodResolver(schema)});
  const [isLoading, setIsLoading] = useState(false);


  async function onRegister(info) {
    setIsLoading(true);

    try {
      const {data} = await axios.post("https://linked-posts.routemisr.com/users/signup" , info)
      console.log(info);
      toast.success(data.message);
      navigate("/login");
    } catch (e) {
      console.log(e.response.data.error);
      toast.error(e.response.data.error)
    }
    setIsLoading(false);
  }

  return (
    <section className='py-12'>
      <div className="container">
        <div className="max-w-lg mx-auto p-8 rounded-xl shadow-lg bg-blue-300 dark:shadow-gray-700 dark:bg-gray-800">
          <h1 className='text-center font-bold text-3xl pb-5 text-blue-950 dark:text-white'>Register</h1>

          <form 
          onSubmit={handleSubmit(onRegister)}
          className="flex flex-col gap-4">
            {/* Name------------------------------------------------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your Name</Label>
              </div>
              <TextInput id="name" type="text" placeholder="Malak Esmail" shadow
              {...register ("name")} />
              {errors?.name && touchedFields?.name && <p className='text-red-600'>{errors?.name?.message}</p>}
            </div>
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
              {errors?.password && touchedFields?.password && (<p className='text-red-600'>{errors?.password?.message}</p>)}
            </div>
            {/* Confirm Passward------------------------------------------------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm password</Label>
              </div>
              <TextInput id="rePassword" type="password" placeholder=" ******** "  shadow
              {...register("rePassword")} />
              {errors?.rePassword && touchedFields?.rePassword && <p className='text-red-600'>{errors?.rePassword?.message}</p>}
            </div>
            {/* Date------------------------------------------------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
              </div>
              <TextInput id="dateOfBirth" type="date" shadow
              {...register("dateOfBirth")} />
              {errors?.dateOfBirth && touchedFields?.dateOfBirth && <p className='text-red-600'>{errors?.dateOfBirth?.message}</p>}
            </div>
            {/* Gender------------------------------------------------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender">Gender</Label>
              </div>

              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="male" name="gender" value="male" defaultChecked
                  {...register("gender")} />
                  <Label htmlFor="male">Male</Label>
                </div>
              </div>

              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio id="female" name="gender" value="female"
                  {...register("gender")} />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
            </div>
            {/* Button------------------------------------------------------- */}
            <Button  className='mt-2 bg-blue-500 dark:bg-blue-600 text-white' type="submit">
              { isLoading ? <i className='fa-solid fa-spinner fa-spin text-white'></i> : "Create new account"  }
            </Button>
          </form> 
        </div>
      </div>
    </section>
  );
}
