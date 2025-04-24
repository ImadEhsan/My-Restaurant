import axios from "axios";

const axiosinstances = axios.create({
    baseURL: 'https://my-restaurant-backend.onrender.com/api',
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    // },
})

export default axiosinstances
