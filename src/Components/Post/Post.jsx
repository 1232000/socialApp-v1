import React, { useContext ,useState} from 'react'
import { Link } from 'react-router-dom';
import DeletePost from '../DeletePost/DeletePost';
import NewComment from '../../pages/auth/NewComment/NewComment';
import { authContext } from '../../Context/AuthContext';
import { Button, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpdatePost from '../UpdatePost/UpdataPost';
import HandleComment from '../HandleComment/HandleComment';
import profileImg from  '../../assets/images/profileImg.png';


export default function Post({post , isPostDetails }) {

  const token = localStorage.getItem("token");
  const {UserData} = useContext(authContext);
  const [isEditing, setIsEditing] = useState(null);
  const [UpdatingPost, setUpdatingPost] = useState(null);
  const {handleSubmit , register} = useForm();
  const queryClient = useQueryClient()

    async function updateComment({commentId , content}) {
        return await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}` , {content}
      ,{headers:{token}},)
  }

    const { mutate :mutateEditCom} = useMutation({
        mutationFn :updateComment ,
        onSuccess: (data)=>{
        console.log(data);
        toast.success(data?.data?.message);
        queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        queryClient.invalidateQueries({ queryKey: ['userPosts'] });
        setIsEditing(null);
        },
        onError: (e)=>{
        console.log(e);
        toast.error(e?.response?.data?.error);
        },
    })

  return (
    <>
{/*DeletePost----------------------------------------------------------------------------------------------------- */}
      <main className='overflow-x-hidden break-words bg-blue-200 dark:bg-gray-700 p-3 rounded-lg mt-3 w-lg'>
        <div className="p-3 bg-transparent shadow-lg rounded-lg">

          <DeletePost 
          userName = {post?.user.name} 
          userImg = {post?.user?.photo} 
          creationDate = {post.createdAt}
          userPostId = {post?.user._id}
          postId = {post?.id}
          handleUpdateModal={() => document.getElementById("updatePost").showModal()}
          setUpdatingPost={()=>setUpdatingPost(post.id)}
          />
          <p className="p-3 text-gray-900 dark:text-white">{post?.body}</p>

          {post?.image? <img className='w-full mt-3'
          src={post?.image}
          alt="image"
          /> : ""}
        </div>
{/*UpdatePost----------------------------------------------------------------------------------------------------- */}
        { UpdatingPost === post.id &&
         <UpdatePost 
          postId={post?.id}
          fetchedPost={post}
          handleClosee={() => setUpdatingPost(null)}
        /> 
      }
{/*COMMENTS----------------------------------------------------------------------------------------------------- */}
        { post?.comments?.length>0 && !isPostDetails?
        <div className="p-2 bg-blue-100 dark:bg-gray-500 rounded-lg mt-3 w-full">
           <HandleComment 
             userName={post?.comments[0]?.commentCreator?.name}
             userImg={post?.comments[0]?._id === UserData?._id? UserData.photo : post?.comments[0]?.commentCreator?.photo.includes("undefined")? profileImg :  post?.comments[0]?.commentCreator?.photo}
             creationDate={post?.comments[0]?.createdAt}
             userCommentId={post?.comments[0]?.commentCreator?._id}
             commentId={post?._id}
             userPostId = {post?.user?._id}
             userLoginId = {UserData?._id}
             setIsEditing={setIsEditing}
           />

            <p className="p-3 text-gray-900 dark:text-white">{post?.comments[0]?.content} </p>
          <Link to={`/PostDetails/${post.id}`} className='block bg-blue-900 dark:bg-gray-700 dark:text-gray-200 p-2 w-fit rounded-lg ms-auto'>View All Comments</Link>
        </div> 

        : post?.comments?.length>0 ?
        <>
          {post?.comments.map((comment , idx)=>{
            return <div key={idx} className="p-2 bg-blue-100 dark:bg-gray-500 rounded-lg mt-3 w-full">

          <HandleComment 
            userName={comment?.commentCreator?.name}
            userImg={comment?.commentCreator?._id === UserData?._id? UserData?.photo : comment?.commentCreator?.photo.includes("undefined")? profileImg : comment.commentCreator?.photo }
            creationDate={comment?.createdAt}
            commentId={comment?._id}
            userCommentId={comment?.commentCreator?._id}
            userPostId = {post?.user?._id}
            userLoginId = {UserData?._id}
            setIsEditing ={setIsEditing}
          />

            { isEditing === comment._id?
             <form onSubmit={handleSubmit((formData) =>
                mutateEditCom({
                  commentId: comment._id,
                  content: formData.content
                })
              )}>
              <Textarea className='mt-3 bg-blue-200'
              key={comment._id}
              defaultValue={comment.content}
              
              {...register("content")}
              />
                <div className='flex gap-2 mt-3'>
                  <Button type="submit" className='cursor-pointer p-3 bg-blue-900 dark:bg-gray-900 hover:bg-red-700 font-bold focus:ring-0 ms-auto'>Update</Button>
                  <Button type="reset"  className='cursor-pointer p-3 bg-blue-900 dark:bg-gray-900 hover:bg-red-700 font-bold focus:ring-0 me-2' onClick={()=>setIsEditing(null)}>Cancel</Button>
                </div>
             </form>
              :<p className="p-3 text-gray-900 dark:text-white">{comment.content}</p>}
              
        </div> 
        })
        }
          </> 

          : <div className="p-2 bg-blue-100 dark:bg-gray-800  rounded-lg mt-3  w-full">
            <p className="text-gray-900 dark:text-gray-400">No Comments Yet...</p>
          </div>
        }
{/*WRITE COMMENT----------------------------------------------------------------------------------------------------- */}

        <NewComment id={post.id}/>
      </main>
    </>
  )
}
