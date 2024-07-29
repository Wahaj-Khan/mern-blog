import { app } from '../../firebase';
import { Toaster, toast } from 'sonner';
import { useRef, useState } from 'react';
import { BsCameraFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Spinner, Alert } from 'flowbite-react';
import { signOut } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateStart, updateSuccess, updateFailure } from '../../redux/user/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const DashProfile = () => {
  let timeoutId = null;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const imagePickerRef = useRef()
  const [formData, setFormData] = useState({});
  const [updateError, setUpdateError] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
  const { currentUser, loading } = useSelector(state => state.user)

  const imageChangeHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      const uploadPromise = uploadImage(file)

      toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: (data) => `${data.name} successful!`,
        error: 'Image must be less than 2MB!'
      });
    }
  }

  const signOutHandler = (e) => {
    e.preventDefault();
    dispatch(signOut());
    navigate('/sign-in');
  }

  const uploadImage = async (file) => {
    setImageFileUploading(true);
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
          setImageFileUploading(false);
          reject(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
            resolve({ name: 'Image upload' });
          }).catch(error => {
            setImageFileUploading(false);
            reject(error.message)
          });
        });
    });
  };

  const handleChange = (e) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateProfileSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateError('Please wait for the image to finish uploading');
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure());
        setUpdateError(data.message || 'Could not update the profile. Please try again.');
      } else {
        dispatch(updateSuccess(data));
        setUpdateProfileSuccess('Profile updated successfully');
        setFormData({});
      }

    } catch (error) {
      dispatch(updateFailure());
      setUpdateError(error.message || 'Could not update the profile. Please try again.');

    }
  }
  console.log(formData)

  return (
    <div className='flex flex-col justify-center items-center mt-5 md:mt-12 w-full px-4'>
      <h1 className='font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col w-full md:w-5/6 lg:w-2/5 mt-8 md:mt-10 gap-4' onSubmit={handleSubmit}>
        <input type="file" accept='image/*' onChange={imageChangeHandler} ref={imagePickerRef} hidden />
        <div className='flex mb-2 w-36 h-36 self-center shadow-lg rounded-full'>
          <img src={imageFileUrl || currentUser.profilePicture} alt="profile image" className='w-36 h-36 object-cover shadow-lg rounded-full' />
          <div className="flex justify-center items-center bg-slate-200 hover:bg-slate-300 dark:bg-blue-900 dark:hover:bg-blue-800 w-8 h-8 z-50 rounded-full relative top-28 right-12 cursor-pointer"
            onClick={() => { imagePickerRef.current.click() }}
          >
            <BsCameraFill className="w-8" />
          </div>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='Password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          {loading ? <>
            <Spinner className='mr-2 w-5 h-5' />
            Updating...

          </>

            : 'Update'}
        </Button>
      </form>
      <div className='flex justify-between w-full md:w-5/6 lg:w-2/5 mt-4'>
        <span className='text-red-500 font-semibold cursor-pointer'>Delete Account</span>
        <span className='text-red-500 font-semibold cursor-pointer' onClick={signOutHandler}>Sign Out</span>
      </div>
      {updateError &&
        <Alert color='failure' className='flex justify-center mt-4 w-full h-10 md:w-5/6 lg:w-2/5'>
          {updateError}
        </Alert>
      }
      {updateProfileSuccess &&
        <Alert color='success' className='flex justify-center mt-4 w-full h-10 md:w-5/6 lg:w-2/5'>
          {updateProfileSuccess}
        </Alert>
      }
      <Toaster richColors />
    </div>
  )
}

export default DashProfile