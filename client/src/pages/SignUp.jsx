import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

const SignUp = () => {
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
            Sign up to write and read amazing content! You can sign up with email and password or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label value="Your username" />
              <TextInput placeholder="Username" type="text" id="username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Your email" />
              <TextInput placeholder="name@company.com" type="email" id="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label value="Your password" />
              <TextInput placeholder="Password" type="text" id="password" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex mt-4 text-sm gap-1">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-purple-500 font-bold">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp