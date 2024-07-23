import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { Toaster, toast } from 'sonner';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  let timeoutId = null;

    useEffect(() => {
      if (error === "Please fill in all fields") {
        toast.error(error);
      }
    },);
  
  const handleChange = (e) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields"));
    }
    dispatch(signInStart());

    const signInPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          reject(data.message || "An error occurred. Please try again.");
        } else {
          dispatch(signInSuccess(data));
          resolve(data);
        }
      } catch (error) {
        dispatch(signInFailure(error.message || "An error occurred. Please try again."));
        reject(error.message || "An error occurred. Please try again.");
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
        dispatch(signInFailure(err));
        return `Error: ${err}`;
      }
    });
  };

  return (
    <div className="min-h-screen mt-20 font-medium relative">

      <div className="flex flex-col md:flex-row max-w-3xl p-3 gap-5 mx-auto md:items-center">
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500">
              Wahaj&apos;s
            </span>
            Blog
          </Link>
          <p className="mt-4 text-sm">
            Sign in to write and read amazing content! You can sign in with email and password or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label value="Your email" />
              <TextInput placeholder="name@company.com" type="email" id="email" onChange={handleChange} />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Your password" />
              <TextInput placeholder="Password" type="password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
              {loading ?
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Loading</span>
                </>
                : "Sign in"}
            </Button>
            <OAuth />
          </form>
          <div className="flex mt-4 text-sm gap-1">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-purple-400 font-bold">Sign up</Link>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default SignIn;
