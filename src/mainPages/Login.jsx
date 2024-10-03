import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiCalls.js";
import 'react-toastify/dist/ReactToastify.css';
import { FaSignInAlt } from "react-icons/fa";
import { showToast } from "../components/toast/Toast";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
        error: {
            username: '',
            password: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue((preValue) => ({
            ...preValue,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const { username, password } = inputValue;
        const errors = {
            username: '',
            password: ''
        };
        let isValid = true;

        if (!username) {
            errors.username = 'Please enter a username';
            isValid = false;
        } else if (username.length < 2) {
            errors.username = 'Username is too short';
            isValid = false;
        }
        if (!password) {
            errors.password = 'Please enter a password';
            isValid = false;
        } else if (password.length < 8) { // Changed to < 8 for clarity
            errors.password = 'Password should be at least 8 characters long';
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await loginUser(inputValue.username, inputValue.password);
                setInputValue({
                    username: '',
                    password: '',
                    error: {
                        username: '',
                        password: ''
                    }
                });
                showToast({ isSuccess: true, message: "Login Success" })
                localStorage.setItem('userInfo', response.data.accessToken);
                navigate('/dashboard', { state: { firstName: response.data.firstName, lastName: response.data.lastName, image: response.data.image } });
            } catch (error) {
                console.log(error.message, 'error');
                showToast({ isSuccess: false, message: "Login Failed!!!" })
            };
        }
        else {
            setInputValue((preValue) => ({
                ...preValue,
                error: errors
            }));
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200">

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={inputValue.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"

                                        autoComplete="email"
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {inputValue.error.username && (
                                        <p className="text-red-600 font-medium text-sm mt-1">{inputValue.error.username}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a  className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={inputValue.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"

                                        autoComplete="current-password"
                                        className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {inputValue.error.password && (
                                        <p className="text-red-600 font-medium text-sm mt-1">{inputValue.error.password}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <div className="flex items-center ">

                                        <FaSignInAlt className="mx-1 text-lg" />
                                        <span className="text-md p-2">Sign In</span>
                                    </div>

                                </button>
                            </div>
                        </form>

                        {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;