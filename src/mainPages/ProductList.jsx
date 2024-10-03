import { useNavigate } from 'react-router-dom';
import { getProductList } from '../services/apiCalls.js';
import { useState, useEffect } from 'react';
const ProductList = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
const navigate=useNavigate();
    const getUserDetails = async () => {
        setLoading(true);
        const result = await getProductList();
        console.log(result?.data)
        setUserData(result?.data?.products);
        setLoading(false);
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const gotoDetailsPage=(id)=>{
        navigate(`/productDetails/${id}`)
    }

    return (
        <>
            {
                loading ? (<div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span className='sr-only'>Loading...</span>
                     <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                   <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                   <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
               </div>) : (
                    <>
                        <h1 className="text-3xl text-black text-center mt-5">View Products Detail</h1>
                        <div className="container mx-auto p-2 mt-5 bg-gray-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                                                Id
                                            </th>
                                            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                                                Title
                                            </th>
                                            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                                                Category
                                            </th>

                                            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                                                Price
                                            </th>
                                            <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700">
                                                Image
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userData.map((item, id) => {
                                                return (
                                                    <tr className="hover:bg-gray-100 cursor-pointer" key={id} onClick={()=>gotoDetailsPage(item.id)}>
                                                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                            {item.id}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                            {item.title}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                            {item.category}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                            {item.price}
                                                        </td>
                                                        <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                                                            <img src={item.images[0]} alt="" style={{ height: "40px", width: "40px" }} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default ProductList;
