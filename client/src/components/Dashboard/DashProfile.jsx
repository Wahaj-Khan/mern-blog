import { app } from '../../firebase';
import { Toaster, toast } from 'sonner';
import { useRef, useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import { signOut } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const DashProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const imagePickerRef = useRef()
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const { currentUser } = useSelector(state => state.user)

  const imageChangeHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uploadPromise = uploadImage(file)

      toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: (data) => `${data.name} successful!`,
        error: 'Could not upload the image. Please try again.'
    });
    }
  }

  const signOutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
    navigate('/sign-in');
  }

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
        (error) => {
          reject(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            resolve({ name: 'Image upload' });
          }).catch(error => reject(error.message));
        });
    });
  };

  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile])

  return (
    <div className='flex flex-col justify-center items-center mt-5 md:mt-12 w-full px-4'>
      <h1 className='font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col w-full md:w-5/6 lg:w-2/5 mt-8 md:mt-10 gap-4'>
        <input type="file" accept='image/*' onChange={imageChangeHandler} ref={imagePickerRef} hidden />
        <div className='flex mb-2 w-36 h-36 self-center shadow-lg rounded-full'>
          <img src={imageFileUrl || currentUser.profilePicture} alt="profile image" className='w-36 h-36 object-cover shadow-lg rounded-full' />
          <div className="flex justify-center items-center bg-slate-200 hover:bg-slate-300 dark:bg-blue-900 dark:hover:bg-blue-800 w-8 h-8 z-50 rounded-full relative top-28 right-12 cursor-pointer"
            onClick={() => { imagePickerRef.current.click() }}
          >
            <BsCameraFill className="w-8" />
          </div>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='Password' />
        <Button gradientDuoTone='purpleToBlue' outline>Update</Button>
      </form>
      <div className='flex justify-between w-full md:w-5/6 lg:w-2/5 mt-4'>
        <span className='text-red-500 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-500 font-semibold cursor-pointer' onClick={signOutHandler}>Sign Out</span>
      </div>
      <Toaster richColors/>
    </div>
  )
}

export default DashProfile