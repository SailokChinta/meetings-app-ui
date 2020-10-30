import axios from 'axios';

export const getAllUsers = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.get( `http://localhost:8080/api/users`, config )
                .then( response => {
                    console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}