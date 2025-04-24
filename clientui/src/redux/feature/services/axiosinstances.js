import axios from "axios";

const axiosinstances = axios.create({
    baseURL: 'https://my-restaurant-backend.onrender.com',
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
    // },
})

export default axiosinstances
