import { Button } from 'flowbite-react';
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleGoogleAuth = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        const signInPromise = new Promise(async (resolve, reject) => {
            try {
                const resultsFromGoogle = await signInWithPopup(auth, provider);
                const res = await fetch('/api/auth/google', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: resultsFromGoogle.user.displayName,
                        email: resultsFromGoogle.user.email,
                        googlePhotoURL: resultsFromGoogle.user.photoURL
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    dispatch(signInSuccess(data));
                    resolve(data);
                } else {
                    reject(data.message || 'An error occurred.');
                }
            } catch (error) {
                if (error.code === 'auth/popup-closed-by-user') {
                    reject('Popup closed by user!');
                } else {
                    reject(error.message || 'An error occurred.');
                }
            }
        });

        toast.promise(signInPromise, {
            loading: 'Signing in...',
            success: () => {
                setTimeout(() => {
                    navigate("/");
                }, 1000);
                return 'Signed in successfully!';
            },
            error: (err) => {
                return `Error: ${err}`;
            }
        });
    };

    return (
        <>
            <Button type='button' gradientDuoTone='purpleToPink' outline onClick={handleGoogleAuth}>
                <FaGoogle className='w-5 h-5 mr-2' />
                <span>Continue with Google</span>
            </Button>
            <Toaster />
        </>
    );
}

export default OAuth;
