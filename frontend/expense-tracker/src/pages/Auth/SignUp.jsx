import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { validEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATH } from '../../utils/apiPath';
// import { UserContext } from '../../context/userContext';
// import uploadImage from '../../utils/uploadImage';


const SignUp = () => {

  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState(null)

  // const { updateUser } = useContext(UserContext)

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = ""

    if (!fullName) {
      setError("Enter your full name")
      return
    }
    if (!validEmail(email)) {
      setError("enter valid emailId")
      return
    }

    if (!password) {
      setError("enter password")
      return
    }

    setError("")

    // SignUp API call
  }

  return (
    <AuthLayout>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg'>
          <h3 className='text-2xl font-semibold text-black text-center'>
            Create New Account
          </h3>
          <p className='text-[14px] text-slate-700 mt-2 mb-8 text-center'>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">

            <div className="flex justify-center">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>

            {/* Name and email stacked vertically */}
            <Input
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full name"
              placeholder="Vansh Gupta"
            />

            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder='vansh@gmail.com'
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder='••••••••'
            />

            {error && <p className='text-red-500 text-xs'>{error}</p>}

            <button type='submit' className='btn-primary cursor-pointer w-full text-lg py-3'>
              SIGN UP
            </button>

            <p className='text-[14px] text-slate-800 text-center mt-4'>
              Already have an account?
              <Link className='font-medium text-primary underline' to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
