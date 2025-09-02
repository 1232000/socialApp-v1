import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Post from '../../../Components/Post/Post';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PostDetails() {

    const {id} = useParams()

        function getSinglePost() {
        return axios.get(
          `https://linked-posts.routemisr.com/posts/${id}`,
           
          {headers: {token: localStorage.getItem("token")}}
          )
        }

    const {data, error, isLoading, isError, isFetching} = useQuery({
      queryKey:["post" , id],
      queryFn: getSinglePost ,
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
  return (
    <>
     <section className='min-h-page flex flex-col justify-center items-center py-3'>
       <Post post={data?.data.post} isPostDetails={true}/>

     </section> 

    </>
  )
}
