"use client";
import { Button, Modal, ModalBody, ModalHeader} from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

export default function ChangeProfileImage({openModal, setOpenModal ,getUserDataApi}) {
    const {register , handleSubmit} = useForm();
    const token = localStorage.getItem("token")

    async function changeProfilePhoto(data) {
        const formData = new FormData();
        formData.append("photo" , data.photo[0]);
        return await axios.put(
            `https://linked-posts.routemisr.com/users/upload-photo`, formData
            ,{headers:{token}},
        );
    }
    const { mutate:handleProfileImage , isPending } = useMutation({
        mutationFn :changeProfilePhoto ,

        onSuccess: ()=>{
        setOpenModal(false);
        toast.success("Photo Updated Successfully");
        getUserDataApi(localStorage.getItem("token"));
        },

        onError: (e)=>{
        console.log(e);
        toast.error(e?.response?.data?.error || "Photo Updating failed");
        },
    })


  return (<>

    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
    <ModalHeader className="bg-blue-200 dark:bg-gray-700"/>
    <ModalBody className="bg-blue-200 dark:bg-gray-700">

    <form onSubmit={handleSubmit(handleProfileImage)}

    className="flex flex-col bg-blue-200 dark:bg-gray-700 gap-4 w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-blue-200 hover:bg-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-blue-700 dark:text-gray-400"
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
          <p className="mb-2 text-sm text-blue-700 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-blue-700 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput {...register("photo")} id="dropzone-file" className="hidden" />
      </Label>
      <Button className="focus:ring-0 text-blue-900 font-bold bg-blue-400 dark:bg-gray-900 hover:bg-blue-500 cursor-pointer dark:hover:bg-gray-800"
       type="submit">{isPending?
        <i className="fa-solid fa-spinner fa-spin text-blue-900 dark:text-white"></i>
        : "upload"}</Button>
    </form>

    </ModalBody>
    </Modal>
    
    </>
  );
}
