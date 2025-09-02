"use client";
import {  Avatar, Card } from "flowbite-react";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import ChangeProfileImage from "../ChangeProfileImage/ChangeProfileImage";

export function ProfileCard() {

    const [openModal, setOpenModal] = useState(false);
    const {UserData , getUserDataApi} = useContext(authContext);

  return (
        <>
    <Card className="w-lg mt-4 bg-blue-200 dark:bg-gray-700">

     {UserData &&
      <div className="w-full flex flex-col items-center">
        
        <div className="relative">
          <Avatar
            alt={UserData.name}
            className="avatar mb-3 rounded-full shadow-lg size-24"
            img={UserData.photo}
            rounded 
          /> 
          <MdEdit className= "absolute bottom-0 end-0 cursor-pointer dark:text-white dark:bg-gray-900 p-2 size-8 rounded my-2"
            onClick={() => setOpenModal(true)} 
          />
        </div>
        <h5 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{UserData.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{UserData.email}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{UserData.dateOfBirth}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{UserData.gender}</span>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link to={'/changePassword'}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-blue-800 text-white px-4 py-2 text-center text-sm font-medium hover:bg-blue-700  focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            > Change Passwowrd</Link>
          </div>


      </div>}
    </Card>

    <ChangeProfileImage openModal={openModal} setOpenModal={setOpenModal} getUserDataApi={getUserDataApi} />
    </>
  );
}
