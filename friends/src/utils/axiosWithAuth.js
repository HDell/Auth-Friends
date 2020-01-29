import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({ //returns an axios instance
        //config options
        baseURL: 'http://localhost:5000', // /api
        headers: {
            authorization: localStorage.getItem('token')
        }

    });
};