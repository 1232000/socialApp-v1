import React, { useEffect } from 'react'
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UpdatePost from '../UpdatePost/UpdataPost';

export default function DeletePost({userName ,userImg ,creationDate ,userPostId , postId ,setUpdatingPost}) {
    const token = localStorage.getItem("token")
    const {user : loggedUserId} = jwtDecode(token);


    async function deletePost() {
        return await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`
      ,{headers:{token }},
    )}
    const queryClient = useQueryClient();

  const {isPending:isPendingDeletePost , mutate:mutateDeletePost} = useMutation({
    mutationFn :deletePost ,

    onSuccess: (data)=>{
      console.log(data);
      queryClient.invalidateQueries({
        queryKey : ['userPosts'],

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
             <p className="truncate teaxt-sm text-gray-900 dark:text-gray-300">{userName}</p>
             <p className="truncate text-xs text-gray-900 dark:text-gray-300">{creationDate}</p>
         </div>

         {loggedUserId === userPostId &&

         <details className="dropdown dropdown-left ms-auto">
         <summary className="btn shadow-none size-fit px-0 m-1 bg-transparent border-0">
             <i className='fa-solid fa-ellipsis ms-auto text-lg text-blue-900 dark:text-white'></i>
         </summary>
         <ul className="bg-gray-800 menu dropdown-content dark:text-white rounded-box z-1 w-52 p-2 shadow-md">
            <li>
              <button onClick={()=>setUpdatingPost(postId)}>
                Update
              </button>
            </li>
             <li>
                <button onClick={()=>{mutateDeletePost()}}>
                    {isPendingDeletePost?<i className='fa-solid fa-spin fa-spinner dark:text-white'></i>:"Delete"}
                </button>
             </li>
         </ul>
         </details>}
     </div>

    </>
  )
}