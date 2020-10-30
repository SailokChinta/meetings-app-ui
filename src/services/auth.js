import axios from 'axios';

export const authenticateUser = ( email, password ) => {
    return axios.post( `http://localhost:8080/api/auth/login`, { email, password } )
            .then( response => {
                return response.data;
            })
            .catch( error => {
                throw error.message;
            });
}