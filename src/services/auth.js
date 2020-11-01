import axios from 'axios';

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
    for( const [ key, val ] of Object.entries( data ) ) {
        localStorage.setItem( key, val );
    }
}

export const logOutUser = () => {
    localStorage.clear();
}

export const isAdmin = () => {
    return !!localStorage[ 'roles' ].split(',').find( role => role === 'ADMIN' );
}

export const isAuthenticated = () => {
    return localStorage[ 'token' ] !== '';
};