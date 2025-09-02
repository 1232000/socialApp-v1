import React, { useContext, useState } from 'react'
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function HandleComment({userName ,userImg ,creationDate ,userCommentId, commentId ,userPostId ,userLoginId ,setIsEditing , UserData}) {
    const token = localStorage.getItem("token");

    async function deleteComment() {
        return await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`
      ,{headers:{token }},
    )}
    const queryClient = useQueryClient();

    const {isPending: isPendingDelCom , mutate :mutateDelCom} = useMutation({
        mutationFn :deleteComment ,
        onSuccess: (data)=>{
        console.log(data);
        queryClient.invalidateQueries({
            queryKey : ['allPosts'],
            queryKey : ['userPosts'],
            queryKey : ['post'],
        });
        toast.success(data?.data?.message);
        },

        onError: (e)=>{
        console.log(e);
        toast.error(e?.response?.data?.error);
        },
    })


  return (
    <>
        <div className="flex items-center space-x-4">
            <div>
                <img
                alt="image"
                height="40"
                src={userImg}
                width="40"
                className="rounded-full"
                />
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm text-gray-900 dark:text-gray-300">{userName}</p>
                <p className="truncate text-xs text-gray-900 dark:text-gray-300">{creationDate}</p>
            </div>
         { (userPostId === userLoginId && userLoginId  === userCommentId  ) &&
            <details className="dropdown dropdown-left ms-auto">
         <summary className="btn shadow-none size-fit px-0 m-1 bg-transparent border-0">
             <i className='fa-solid fa-ellipsis ms-auto text-lg text-blue-900 dark:text-white'></i>
         </summary>
         <ul className="bg-gray-800 menu dropdown-content dark:text-white rounded-box z-1 w-52 p-2 shadow-md">
            <li>
                <button onClick={()=>setIsEditing(commentId)}>Update</button>
            </li>
            <li>
                <button onClick={()=>{mutateDelCom()}}>
                    {isPendingDelCom ?<i className='fa-solid fa-spin fa-spinner text-blue-900 dark:text-white'></i>:"Delete"}
                </button>
            </li>
         </ul>
         </details>
          } 
        </div>
    </>
  )
}
