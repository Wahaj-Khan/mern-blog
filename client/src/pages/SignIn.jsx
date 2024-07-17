import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  let timeoutId = null;

  const handleChange = (e) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill in all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message || "An error occurred. Please try again.");
      }
      
      navigate("/");

    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20 font-medium">
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
          </form>
          <div className="flex mt-4 text-sm gap-1">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-purple-500 font-bold">Sign up</Link>
          </div>
          {
            errorMessage && <Alert color="failure" className="mt-5" >
              {errorMessage}
            </Alert>
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn