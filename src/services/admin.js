import axios from 'axios';

export const submitFile = ( file, path ) => {
    const formData = new FormData();
    formData.append( 'file', file );

    const headers = { Authorization: localStorage.token || '', 'Content-Type': 'multipart/form-data' };
    let config = { headers };
    return axios.post( `http://localhost:8080/api/admin/upload/${path}`, formData, config )
                    .then( response => {
                        return response.data;
                    })
                    .catch( error => {
                        throw error;
                    });
}