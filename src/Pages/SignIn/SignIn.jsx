import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';
import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import auth from '../../Firebase/firebase.init';
import axios from 'axios';


const SignIn = () => {
    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');

    const location = useLocation();
    const from = location.state || '/';

    const emailRef = useRef();

    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                navigate('/')
                setUser(result.user)
            })
            .catch(error => {
                console.log('Error', error)
            })
    }

    // setSuccess(false)
    // setLoginError('')
    const navigate = useNavigate()

    const { signInUser } = useContext(AuthContext)

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        signInUser(email, password)
            .then(result => {
                console.log(result.user);
                e.target.reset();

                const user = { email: email }
                axios.post('http://localhost:5000/jwt', user, {
                    withCredentials: true
                })
                    .then(data => {
                        console.log(data)
                    })

                // navigate(from);
                setTimeout(() => {
                }, 1000);
                setSuccess(true)
            })
            .catch(error => {
                console.log('error', error.message)
                setLoginError(error.message)

            })
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold animate__tada animate__animated">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            {/* <label onClick={handleForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <Link to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
                        </p>
                        <div>
                            <button className="btn btn-wide" onClick={handleGoogleSignIn}>Login with Google</button>
                        </div>

                        {/* <div>
                            <button className="btn btn-wide" onClick={handleGithubSignIn}>Login with Github</button>
                        </div> */}
                    </form>

                    {
                        success && <p onLoad={toast.success("Successfully Logged In")} className='text-green-600'></p>
                    }
                    {
                        loginError && <p className='text-red-600'>{loginError}</p>
                    }

                </div>
            </div>
        </div>
    );
};

export default SignIn;