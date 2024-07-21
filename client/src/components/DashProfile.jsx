import { Button, TextInput } from 'flowbite-react'
import { useSelector } from 'react-redux'
const DashProfile = () => {

  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='flex flex-col justify-center items-center mt-5 md:mt-12 w-full px-4'>
      <h1 className='font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col w-full md:w-1/3 mt-8 md:mt-12 gap-4'>
        <div className='mb-2 w-32 h-32 self-center shadow-md shadow-black overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt="profile image" className='w-32 h-32 object-cover rounded-full border-4 border-slate-400 cursor-pointer' />
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Password' />
        <Button gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='flex justify-between w-full md:w-1/3 mt-4'>
        <span className='text-red-500 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-500 font-semibold cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile