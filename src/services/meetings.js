import axios from 'axios';

export const getMeetingsByDate = ( date ) => {
    const params = { date };
    const headers = { Authorization: localStorage.token || '' };
    let config = { params, headers };
    return axios.get( `http://localhost:8080/api/meetings`, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error.response.data.message );
                    throw error;
                });
}

export const searchMeetings = ( period, search ) => {
    const params = { period, search };
    const headers = { Authorization: localStorage.token || '' };
    let config = { params, headers };
    return axios.get( `http://localhost:8080/api/meetings`, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error.response.data.message );
                    throw error;
                });
}

export const addMemberToMeeting = ( id, data ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.patch( `http://localhost:8080/api/meetings/${id}/addMember`, data, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error.response.data.message );
                    throw error;
                });
}

export const excuseMeeting = ( id ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    return axios.patch( `http://localhost:8080/api/meetings/${id}/deleteMember`, null,config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error.response.data.message );
                    throw error;
                });
}

export const addMeeting = ( data ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers };
    console.log( data );
    return axios.post( `http://localhost:8080/api/meetings/add`, data, config )
                .then( response => {
                    // console.log( response.data );
                    return response.data;
                })
                .catch( error => {
                    // console.log( error.response.data.message );
                    throw error;
                });
}