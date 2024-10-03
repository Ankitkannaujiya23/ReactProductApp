import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const addProduct = async (product) => {
    try {
        const response = await axios.post(`${API_URL}/products/add`, product);
        return response;
    } catch (error) {
        console.log(error.response ? error.response.data : error.response.message, 'error');
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
    }
}

export const getProductList = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response;
    } catch (error) {
        console.log(error.response ? error.response.data : error.response.message, 'error');
    }
};


export const editProduct=async(product)=>{
    try {
        const response= await axios.put(`${API_URL}/products/${product.id}`, product);
        return response;
        
    } catch (error) {
        console.log(error.response ? error.response.data : error.response.message, 'error');
    }
}


export const getProductById=async(id)=>{
    try {
        const response= await axios.get(`${API_URL}/products/${id}`);
        return response;
    } catch (error) {
        console.log(error.response ? error.response.data : error.response.message, 'error');
        
    }
}