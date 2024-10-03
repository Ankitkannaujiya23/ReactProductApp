import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const HomePage=()=> {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md sm:max-w-lg p-8 bg-white  backdrop-blur-lg rounded-3xl shadow-lg border border-white border-opacity-10">
                <div className="text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6">
                        Welcome to Your Portal
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-700 mb-2">
                        Ankit Kannaujiya
                    </p>
                    <p className="text-md sm:text-lg text-gray-600 mb-6 sm:mb-8">
                        AnkitKannaujia23@gmail.com
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center w-full py-3 px-6 bg-indigo-600 text-white text-lg sm:text-base font-semibold rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                        <FaSignInAlt className="mr-2" />
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
