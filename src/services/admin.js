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

export const getAllUsers = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.get( `http://localhost:8080/api/admin/users`, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error );
                    throw error;
                });
}

export const getAllMeetings = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.get( `http://localhost:8080/api/admin/meetings`, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error );
                    throw error;
                });
}

export const getAllTeams = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.get( `http://localhost:8080/api/admin/teams`, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error );
                    throw error;
                });
}

