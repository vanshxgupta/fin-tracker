import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input';
import { validEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Enter your full name")
      return
    }
    if (!validEmail(email)) {
      setError("Enter a valid email")
      return
    }
    if (!password) {
      setError("Enter password")
      return
    }

    setError("")

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError(error.message)
      }
    }
  }

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-full max-w-md">
          <h3 className='text-2xl font-bold text-center text-black mb-2'>
            Create New Account
          </h3>
          <p className='text-sm text-center text-slate-600 mb-6'>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>

            <Input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full name"
              placeholder="Enter your name"
            />

            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Enter password"
            />

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <button
              type='submit'
              className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition duration-200'
            >
              SIGN UP
            </button>

            <p className='text-sm text-center text-slate-800'>
              Already have an account?
              <Link className='ml-1 font-medium text-purple-600 hover:underline' to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
