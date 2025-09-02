import React, { useRef, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { FileInput, Label } from "flowbite-react";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function NewPost() {

  const [ViewImg, setViewImg] = useState(null);
  const [addImg, setaddImg] = useState(null);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const postBody = useRef("");
  const postImg = useRef("");

  async function addPost() {
    const formData = new FormData();
    if (postBody.current.value != "") {
      formData.append("body", postBody.current.value);
    }
    if (addImg != null) {
      formData.append("image", addImg);
    }
    
    return await axios.post("https://linked-posts.routemisr.com/posts"  ,formData
      ,{headers:{token }},
    )
  }
  
  function handleImg() {
      const Imgsrc = URL.createObjectURL(postImg.current?.files[0]);
      setaddImg(postImg.current?.files[0]);
      setViewImg(Imgsrc);
  }
  function handleClose() {
      setViewImg(null);
      postImg.current.value = "" ;
      setaddImg(null);
  }

  const {isPending , mutate} = useMutation({
    mutationFn :addPost ,

    onSuccess: (data)=>{
      postBody.current.value ="";
      postImg.current= "";
      setViewImg(null);
      setaddImg(null);

      document.getElementById('post').close();
      toast.success(data?.data?.message);
      
      queryClient.invalidateQueries({
        queryKey: ['userPosts'],
      })
    },
    onError: (error)=>{
      console.log(error);
      toast.error(error?.response?.data?.error);
    },
  })
  return (
    <>
      <header className='bg-blue-700 dark:bg-gray-700 p-3 mt-3 rounded-lg w-lg'>
        <button className="btn rounded-3xl text-lg w-full bg-blue-100 dark:bg-gray-400 text-sky-700 dark:text-white outline-0 border-0 p-6" 
        onClick={()=>document.getElementById('post').showModal()}>What's on your mind ?</button>
      </header>
        {/*modal==========================================================================================*/}

      <dialog id="post" className="modal">
      <div className="modal-box flex flex-col bg-blue-200 dark:bg-gray-800">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost border-0 absolute right-2 top-2 text-blue-950 dark:text-white bg-blue-400 dark:bg-gray-800">✕</button>
        </form>
        <h3 className="font-bold text-lg text-sky-700 dark:text-white">Add New Post</h3>
    
      <hr className='mt-3 dark:text-gray-400' />
        {/*body==========================================================================================*/}
        <textarea ref={postBody} className="textarea w-full rounded-lg text-sky-900 dark:text-white bg-blue-300 shadow-lg dark:bg-gray-700 mt-5 outline-0 border-0 focus:outline-1 focus:outline-gray-400" placeholder="Write your thought here"></textarea>

        {/*image==========================================================================================*/}

        {ViewImg? 
        <div className="w-full mt-5 rounded-lg overflow-hidden">
          <div className="bg-blue-800 dark:bg-gray-900 size-[25px] rounded-full ms-auto mb-2 flex justify-center items-center">
            <i onClick={handleClose} className='cursor-pointer text-sm fa-solid fa-xmark text-white block text-end'></i>
          </div>
          <img src={ViewImg} alt="image" />
        </div>
        :
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex mt-5 h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-blue-300 shadow-lg hover:bg-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-sky-700 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-sky-700 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-sky-700 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <FileInput ref={postImg} onChange={handleImg}
             id="dropzone-file" className="hidden" />
          </Label>
        </div>
        }
        <button disabled = {!ViewImg && !(postBody?.current?.value?.trim()) || isPending } onClick={() => mutate()} className="btn mx-auto px-9 mt-4 rounded-3xl bg-blue-400 hover:bg-blue-500 text-sky-900 shadow-lg outline-0 border-0" >
          {isPending? <i className='fa-solid fa-spin fa-spinner text-blue-900 dark:text-white'></i>
          : "Post" }
          </button>
          
      </div>
    </dialog>
    
    </>
  )
}
