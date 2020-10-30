import axios from 'axios';

export const getAllTeamsByUserId = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers }
    return axios.get( `http://localhost:8080/api/teams`, config )
                .then( response => {
                    console.log( response.data )
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}

export const getAllTeams = () => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers }
    return axios.get( `http://localhost:8080/api/teams/all`, config )
                .then( response => {
                    console.log( response.data )
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}

export const addTeam = ( data ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers }
    return axios.post( `http://localhost:8080/api/teams/add`, data, config )
                .then( response => {
                    console.log( response.data )
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}

export const addMemberToTeam = ( id, data ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers }
    return axios.patch( `http://localhost:8080/api/teams/${id}/addMember`, data, config )
                .then( response => {
                    console.log( response.data )
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}

export const excuseTeam = ( id ) => {
    const headers = { Authorization: localStorage.token || '' };
    let config = { headers }
    return axios.patch( `http://localhost:8080/api/teams/${id}/deleteMember`, config )
                .then( response => {
                    console.log( response.data )
                    return response.data;
                })
                .catch( error => {
                    console.log( error.response.data.message );
                    throw error;
                });
}