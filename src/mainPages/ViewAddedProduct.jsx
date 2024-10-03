import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft,FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { showToast } from "../components/toast/Toast";


const ViewAddedProduct = () => {
    const [data, setData] = useState([]);
const navigate=useNavigate();
    useEffect(() => {
        const newData = localStorage.getItem('newProducts');
        if (newData) {
            try {
                const pdata = JSON.parse(newData);
                setData(pdata);
            } catch (error) {
                console.error("Failed to parse newProducts from localStorage:", error);
                setData([]);
            }
        }
    }, []);

    const handleEditProduct=(id)=>{
        navigate(`/editProduct/${id}`)
    }

    const handleDeleteProduct=(id)=>{
        const data= localStorage.getItem('newProducts');
        if(data){
            let newData= JSON.parse(data);
            newData= newData?.filter(r=> r.temp_id != id);
            setData(newData);
            localStorage.setItem('newProducts', JSON.stringify(newData));

            showToast({isSuccess:true, message:"Product Deleted Successfully!!"});
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">View New Products Detail</h1>
                    <Link to="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    {data && data.length > 0 ? (
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr>
                                    {[
                                        { label: "ID", accessor: "id" },
                                        { label: "Brand", accessor: "brand" },
                                        { label: "Category", accessor: "category" },
                                        { label: "Description", accessor: "description" },
                                        { label: "Discount%", accessor: "discountPercentage" },
                                        { label: "Price", accessor: "price" },
                                        { label: "Rating", accessor: "rating" },
                                        { label: "Stock", accessor: "stock" },
                                        { label: "Title", accessor: "title" },
                                        {label:"Action", accessor:"action"},
                                    ].map((header) => (
                                        <th
                                            key={header.accessor}
                                            className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            {header.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, index) => (
                                    <tr
                                        key={item.id || index}
                                        className={`${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {index+1}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.brand}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.description}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.discountPercentage}%
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            ${item.price}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.rating}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.stock}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700 ">
                                            <div className="flex">

                                        <FaEdit className="text-indigo-600 text-lg mx-2 cursor-pointer" onClick={()=>handleEditProduct(item.temp_id)} />
                                        <MdDelete className="text-red-600 text-lg cursor-pointer" onClick={()=>handleDeleteProduct(item.temp_id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No products available to display.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAddedProduct;
