import React, { useContext, useState } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import auth from '../../Firebase/firebase.init';

const Register = () => {
    const [showPass, setShowPass] = useState(false)
    const [success, setSuccess] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const { createUser } = useContext(AuthContext);
    
    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage('')
        setSuccess(false)

        if (password.length < 6) {
            setErrorMessage('Password must have Uppercase, Lowercase letter & length have to be 6 characters or long');
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one Uppercase, one Lowercase, one Number, one Special Character');
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                e.target.reset();
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                setSuccess(true)

                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
                    .then(() => {
                        console.log('User profile updated')
                    })
                    .catch(error => console.log('User profile update error'))
            })
            .catch(error => {
                console.log('Error', error.message)
                setErrorMessage(error.message)
                setSuccess(false)
            })

    }


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left animate__animated animate__bounce">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo-URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="photo-URL" className="input input-bordered" required />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPass ? 'text' : 'password'} name='password' placeholder="password" className="input input-bordered" required />

                            <button onClick={() => setShowPass(!showPass)} className='btn btn-xs absolute right-3 top-12'>


                                {
                                    showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                }
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign In</Link>
                        </p>
                        {
                            errorMessage && <p className='text-red-600'>{errorMessage}</p>
                        }
                        {
                            success && <p onLoad={toast.success('lol')} className='text-green-600'> Registration Successful</p>
                        }
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;