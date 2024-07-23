import { Button, TextInput } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { BsCameraFill } from "react-icons/bs";
import { signOut } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const DashProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)

  const signOutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
    navigate('/sign-in');
}

  return (
    <div className='flex flex-col justify-center items-center mt-5 md:mt-12 w-full px-4'>
      <h1 className='font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col w-full md:w-1/3 mt-8 md:mt-10 gap-4'>
        <div className='flex mb-2 w-36 h-36 self-center shadow-lg rounded-full'>
          <img src={currentUser.profilePicture} alt="profile image" className='w-36 h-36 object-cover shadow-lg rounded-full' />
          <div className="flex justify-center items-center bg-slate-200 hover:bg-slate-300 dark:bg-blue-900 dark:hover:bg-blue-800 w-8 h-8 z-50 rounded-full relative top-28 right-12">
            <BsCameraFill className="w-8" />
          </div>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Password' />
        <Button gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='flex justify-between w-full md:w-1/3 mt-4'>
        <span className='text-red-500 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-500 font-semibold cursor-pointer' onClick={signOutHandler}>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile