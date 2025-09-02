import React from 'react'
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import Post from '../../../Components/Post/Post';
import NewPost from '../NewPost/NewPost';
import { ProfileCard } from '../../../Components/ProfileCard/ProfileCard';

export default function Profile() {

  const token = localStorage.getItem("token")
  const {user : loggedUserId} = jwtDecode(token);  

  async function getUserPosts() {
    return await axios.get(
      `https://linked-posts.routemisr.com/users/${loggedUserId}/posts`
      ,{headers:{token }},
    )
  }

    const {data, isLoading} = useQuery({
      queryKey:["userPosts"],
      queryFn: getUserPosts ,
      staleTime: 0,
      refetchInterval: 3000  ,
      refetchOnMount: true,
      retry: 3,
      retryDelay:5000,
      gcTime: 3000,
    })

    if(isLoading){
      return(<div className='fixed bg-gray-400/30 inset-0 flex justify-center items-center'>
        <i className='fa-solid fa-spin fa-spinner text-blue-900 dark:text-white w-full text-5xl'></i>
      </div>);
    }

    function toTop() {
      scrollTo({
        top:0 ,
        behavior: 'smooth'
      })
    }

  return (
     <section className='min-h-page flex flex-col justify-center items-center py-3'>
       <NewPost/>
       <ProfileCard/>
       {data?.data?.posts?.slice().reverse().map((post ,index)=><Post key={index} post={post}/>)}

      <button className="fixed bottom-0 end-0 m-4 cursor-pointer bg-sky-600 rounded-full p-2"
        onClick={() => toTop()}>
        <i className="fa-solid fa-arrow-up dark:text-white text-lg"></i>
      </button>
     </section>   
     )
}
