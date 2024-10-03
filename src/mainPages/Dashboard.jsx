import { useLocation, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaPlusCircle, FaListAlt } from "react-icons/fa";

 const Dashboard = () => {
  const location = useLocation();
  const { firstName, lastName, image } = location.state || {};

  if (!firstName || !lastName || !image) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
    
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Main Dashboard</h1>
        </div>
      </header>


      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
    
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-6 flex items-center mb-8">
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="w-20 h-20 rounded-full mr-6 border-2 border-gray-300"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Welcome, {firstName} {lastName}!
              </h2>
              <p className="text-gray-500">Glad to have you back.</p>
            </div>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         
            <Link to="/productList" className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaBoxOpen className="text-indigo-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">View All Products</h3>
                <p className="text-gray-500">Browse through all available products.</p>
              </div>
            </Link>

          
            <Link to="/addproduct" className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaPlusCircle className="text-green-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Add New Product</h3>
                <p className="text-gray-500">Add a new product to your inventory.</p>
              </div>
            </Link>

           
            <Link to="/addedProducts" className="flex items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaListAlt className="text-blue-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">View New Products</h3>
                <p className="text-gray-500">See the latest additions to your products.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>      
    </div>
  );
};

export default Dashboard;
