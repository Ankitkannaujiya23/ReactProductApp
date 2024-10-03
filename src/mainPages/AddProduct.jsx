import { useEffect, useState } from 'react';
import { Product } from '../models/Product';
import { addProduct, editProduct } from '../services/apiCalls.js';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { showToast } from '../components/toast/Toast.js';

const AddProduct = () => {
    const [inputVal, setInputVal] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: '',
    });
const[errors, setErrors]=useState({});
const {id}=useParams();
const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputVal((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if(id){
            const data = localStorage.getItem('newProducts');
            if(data){
                const products= JSON.parse(data);
                const prd= products.find(item=> item.temp_id=== parseInt(id));
                setInputVal(prd);
            }

        }
    },[]);

    const inputValidate=()=>{
        const{title, price,description,category, discountPercentage, rating, stock, brand}=inputVal;
        let error={};
        let goto=true;
        if (!title.trim()) {
          error["title"]="Enter title";
          goto=false;  
        }
        if (!description.trim()) {
          error["description"]="Enter description";
          goto=false;  
        }
        if (!category.trim()) {
          error["category"]="Enter category";
          goto=false;  
        }
        if (!price.trim()) {
          error["price"]="Enter price";
          goto=false;  
        }
        if (!brand.trim()) {
          error["brand"]="Enter brand";
          goto=false;  
        }
        if (!stock.trim()) {
          error["stock"]="Enter stock";
          goto=false;  
        }
        setErrors(error);
         return goto;
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if(inputValidate()){
        const { title, description, category, price, discountPercentage, rating, stock, brand } = inputVal;
        if (!title || !description || !category || !price || !discountPercentage || !rating || !stock || !brand) {
            showToast({isSuccess:false, message:"All fields are required and must be valid"});
            return;
        }

       

       

        try {
            // const response = id ? await editProduct(inputVal) : await addProduct(inputVal);
             const response =  await addProduct(inputVal);
            showToast({isSuccess:true, message:"Product Addess Successfully!!"});
            const locationData = localStorage.getItem('newProducts');
            const restData = locationData ? JSON.parse(locationData) : [];
            //add id 
            const resData=response?.data;
            resData.temp_id=parseInt(Date.now() * Math.random());
            localStorage.setItem('newProducts', JSON.stringify([...restData, resData ]));
            setInputVal({
                title: '',
                description: '',
                category: '',
                price: '',
                discountPercentage: '',
                rating: '',
                stock: '',
                brand: '',
            });
            navigate('/addedProducts');
        } catch (error) {
            console.log(
                error.response ? error.response.data : error.message,
                'error'
            );
            showToast({isSuccess:false, message:"Failed to Add Product!!!"});
        }
    }
    };

    useEffect(() => {
        const existingProducts = localStorage.getItem('newProducts');
        if (existingProducts) {
            console.log('Existing Products:', JSON.parse(existingProducts));
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200">
                <div className="p-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6 flex items-center justify-center">
                         Add New Product
                    </h2>
                    <form className="space-y-6" onSubmit={handleAddProduct}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={inputVal.title}
                                onChange={handleChange}
                                placeholder="Enter product title"
                                requird
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            />
                             {errors.title && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.title}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={inputVal.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            ></textarea>
                             {errors.description && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.description}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                value={inputVal.category}
                                onChange={handleChange}
                                placeholder="Enter product category"
                                required
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                            />
                              {errors.category && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.category}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={inputVal.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    required
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                                 {errors.price && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.price}</p>
                            )}
                            </div>
                            <div>
                                <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    name="discountPercentage"
                                    id="discountPercentage"
                                    value={inputVal.discountPercentage}
                                    onChange={handleChange}
                                    placeholder="Enter discount (%)"
                                    required
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    name="rating"
                                    id="rating"
                                    value={inputVal.rating}
                                    onChange={handleChange}
                                    placeholder="Enter rating"
                                    required
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                                {errors.rating && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.rating}</p>
                            )}
                            </div>
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    value={inputVal.stock}
                                    onChange={handleChange}
                                    placeholder="Enter stock quantity"
                                    required
                                    min="0"
                                    step="1"
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                                {errors.stock && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.stock}</p>
                            )}
                            </div>
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    value={inputVal.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand name"
                                    required
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                />
                                 {errors.brand && (
                                <p className="text-red-600 font-medium text-sm mt-1">{errors.brand}</p>
                            )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-105"
                            >
                                <FaPlus className="mr-2" /> Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>           
        </div>
    );
};

export default AddProduct;
