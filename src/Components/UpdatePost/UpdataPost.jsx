import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FileInput, Label } from 'flowbite-react';


export default function UpdatePost({ postId , fetchedPost ,handleClosee}) { 
    const token = localStorage.getItem("token")
    const queryClient = useQueryClient();

  useEffect(() => {
    const dialog = document.getElementById("updatePost");
    if (dialog) dialog.showModal();
  }, []);

    const [ViewNewImg, setViewNewImg] = useState(fetchedPost?.image ?? "");
    const [NewImg, setNewImg] = useState(null);
    const [ViewBody, setViewBody] = useState(fetchedPost?.body ?? ""); 
    
    const updateImgRef = useRef(""); 
    
    async function updatePost() {
        const formData = new FormData();

        if (ViewBody.trim() !== "") {
          formData.append("body", ViewBody);
        }else{
          formData.append("body", " ");
        }
        if(NewImg !=null){
          formData.append("image", NewImg);
        }
        return await axios.put(`https://linked-posts.routemisr.com/posts/${postId}` ,formData
      ,{headers:{token}},
    )}


    function handleImg() { 
        const newImgSrc = URL.createObjectURL(updateImgRef.current?.files[0]);
        setNewImg(updateImgRef.current?.files[0]);
        setViewNewImg(newImgSrc);
    } 
    function handleClose() {
        setViewNewImg(null);
        setNewImg(null);
        updateImgRef.current.value = "" ;
    }
    
    const {isPending: isPendingUpdate , mutate: mutateUpdate} = useMutation({
        mutationFn : updatePost ,
        onSuccess: (data)=>{
        document.getElementById('updatePost').close();
        toast.success(data?.data?.message);
        queryClient.invalidateQueries({
            queryKey: ['userPosts'],
        })
        handleClosee();
        },
        onError: (error)=>{
        console.log(error);
        toast.error(error?.response?.data?.error);
        },
    })


  return (
    <>
      <dialog id="updatePost" className="modal">
      <div className="modal-box flex flex-col bg-blue-200 dark:bg-gray-800">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white">✕</button>
        </form>
        <h3 className="font-bold text-lg text-sky-700 dark:text-white">Update Post</h3>
        <hr className='mt-3 dark:text-gray-400' />
        {/*body==========================================================================================*/}
        <textarea value={ViewBody} onChange={(e)=>setViewBody(e.target.value)} className="textarea w-full rounded-lg text-sky-900 dark:text-white bg-blue-300 dark:bg-gray-700 mt-5 outline-0 border-0 focus:outline-1 focus:outline-gray-400" placeholder="Edit your post..."></textarea>

         {/*image==========================================================================================*/}
        {ViewNewImg? 
        <div className="w-full mt-5 rounded-lg overflow-hidden">
          <div className="bg-blue-800 dark:bg-gray-900 size-[25px] rounded-full ms-auto mb-2 flex justify-center items-center">
            <i onClick={handleClose} className='cursor-pointer text-sm fa-solid fa-xmark text-white block text-end'></i>
          </div>
          <img src={ViewNewImg} alt="image" />
        </div>
        :
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor= "update" 
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
              <p className="mb-2 text-sm text-sky-700 dark:text-gray-40">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-sky-700 dark:text-gray-40">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <FileInput ref={updateImgRef} onChange={handleImg}
             id="update" className="hidden"/>
          </Label>
        </div>
        }
        <button disabled = {!(ViewNewImg || ViewBody?.trim()) || isPendingUpdate } onClick={() => mutateUpdate()} className="btn mx-auto px-9 mt-4 rounded-3xl bg-sky-800 text-white outline-0 border-0" >
            {isPendingUpdate? <i className='fa-solid fa-spin fa-spinner text-blue-900 dark:text-white'></i>
            : "Update" }
        </button>
          
      </div>
    </dialog>
    </>
  )
}