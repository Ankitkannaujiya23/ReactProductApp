import React, { useEffect, useState } from 'react'
import { getProductById } from '../services/apiCalls';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const getProductDetails = async (id) => {
        setLoading(true);
        const result = await getProductById(id);
        setData(result.data);
        setLoading(false);
    }

    useEffect(() => {
        if (id) {
            getProductDetails(id);
        } else {
            setLoading(true);
        }
    }, []);

    return (
        <>
            {
                loading ? (<div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div>) : (
                    <div className='flex ps-40 mt-10'>
                        <div className=''>
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Product Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Product details and Description.</p>
                            </div>
                        <div className="h-24 w-24 flex justify-center rounded-full bg-gray-50">
                            <img src={data?.thumbnail} alt="" />
                        </div>

                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Brand</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.brand}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Title</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.title}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Price</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">${data?.price}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Rating</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.rating}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data?.description}
                                        </dd>
                                    </div>
                                    
                                </dl>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductDetails