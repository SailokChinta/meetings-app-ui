import axios from 'axios';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authenticateUser = ( email, password ) => {
    return axios.post( `http://localhost:8080/api/auth/login`, { email, password } )
            .then( response => {
                // console.log( response );
                return response.data;
            })
            .catch( error => {
                throw error;
            });
}

export const setAuthenticationDetails = ( data ) => {
    const { token, ...user } = data;
    localStorage.setItem( TOKEN_KEY, token );
    localStorage.setItem( USER_KEY, JSON.stringify( user ) );
}

export const getUser = () => {
    return JSON.parse( localStorage.getItem( USER_KEY ) ) || {};
}

export const logOutUser = () => {
    localStorage.clear();
}

export const isAdmin = () => {
    const user = JSON.parse( localStorage.getItem( USER_KEY ) ) || {};
    return !!user.roles.find( role => role === 'ADMIN' );
}

export const isAuthenticated = () => {
    return !!localStorage[ 'token' ];
};