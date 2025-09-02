import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewComment({id}) {

    const [Content, setContent] = useState("");
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");

    async function addComment() {
      const values = {
        "content":Content,
        "post": id,
      }
      return (
        await axios.post(
          'https://linked-posts.routemisr.com/comments', values ,
           
          {headers: {token}}
          )
      )}

        const {isPending ,mutate}=useMutation({
        mutationFn: addComment,
        onError: (error)=>{
          console.log(error);
          toast.error(error?.response?.data?.error);
        },
        onSuccess: (data)=>{
          console.log(data);
          toast.success(data?.data?.message);
          queryClient.invalidateQueries({
            queryKey: ["post" ,  id],
          })
          setContent("")
        },
      })
  return (
    <>
      { isPending? <div className='fixed bg-gray-400/30 inset-0 flex justify-center items-center'>
        <i className='fa-solid fa-spin fa-spinner dark:text-white w-full text-5xl'></i>
      </div> : 
      <div className='flex bg-blue-400 dark:bg-gray-500 rounded-lg mt-3 p-3 w-full'>
        <label className='flex p-0 rounded-3xl w-full bg-blue-700 dark:bg-gray-400 text-white outline-0 border-0 focus:border-1' type='text' placeholder="Comment">
            <input className='rounded-3xl ps-5 w-full bg-blue-700 dark:bg-gray-400 text-white outline-0 border-0 ' type='text' placeholder="Comment" 
            value={Content} onChange={(e)=>setContent(e.target.value)}/>
        <button onClick={()=>mutate()} className="btn border-0 rounded-3xl bg-transparent shadow-none me-3"><i className='fa-solid fa-paper-plane text-white'></i></button>
        </label>
      </div>}

    
    </>
  )
}