<template>
    <div>
        <Navbar />
        <div class="container">
            <br>
            <h1>Teams</h1>
            <hr>

            <div v-if="this.status === 'LOADING'" class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Loading Teams...</strong>
            </div>

            <div v-if="this.status === 'ERROR_LOADING'" class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>{{ this.error.response.data.message }}</strong>
            </div>

            <div class="jumbotron jumbotron-fluid" v-if = "status === 'LOADED'  && this.teams.length === 0">
                <div class="container">
                    <p class="lead text-center">You are not part of any team!!</p>
                </div>
            </div>
            <div class="row" v-else-if = "status === 'LOADED'  && this.teams.length > 0 ">
                <div class="col-4 d-flex" v-for="team in this.teams" :key="team._id">
                    <div class="card" style="width: 18rem;" >
                        <div class="card-body">
                            <i class="fa fa-edit" style="float: right; cursor: pointer" @click="beforeEditTeam( team._id )"></i>
                            <h5 class="card-title">{{ team.name }}</h5>
                            <h6 class="card-title">{{ team.shortName }}</h6>
                            <p  class="card-text">{{ team.description }}</p> 
                            <button type="button" class="btn btn-danger" @click="excuseTeam( team._id )" >Excuse Yourself</button>
                            <hr>
                            <strong>Members:</strong>
                            <div v-for='member in team.members' :key="member.userId" style="display: inline">
                                <span class="badge badge-primary" style="margin-left: 10px;">{{ member.email }}</span>
                            </div>
                            <div style= "padding-top: 10px">
                                <select name="users" id="users" style="margin-right: 10px;">
                                    <option value="">Select Member</option>
                                    <option v-for="user in users" :key="user._id" :value="user.email">{{user.email}}</option>
                                </select>
                                <button type="button" class="btn btn-primary"  @click="addMemberToTeam( team._id, $event )">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 d-flex" >
                    <div class="card" style="width: 18rem; height: 100%; cursor: pointer " >
                        <i class="fa fa-plus fa-4x text-center" style="padding-top: 43%" @click="addTeamModal=true"> </i>
                    </div>
                </div>
                <Modal v-model="addTeamModal">
                    <AddTeam v-on:submit-team="submitTeam" :users="this.users"/>
                </Modal>
                <Modal v-model="editTeamModal">
                    <EditTeam v-on:edit-team="editTeam" :team="this.currentEditTeam"/>
                </Modal>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../Navbar/Navbar';
import AddTeam from './AddTeam';
import EditTeam from './EditTeam';

import { getAllTeamsByUserId, excuseTeam, addMemberToTeam } from '@/services/teams';
import { getAllUsers } from '@/services/users'

import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    components: {
        Navbar,
        AddTeam,
        EditTeam,
        'Modal': VueModal
    },
    data() {
        return {
            status: LOADING,
            teams: null,
            users: null,
            addTeamModal: false,
            editTeamModal: false,
            currentEditTeam: null
        }
    },
    methods: {
        submitTeam( addedTeam ) {
            this.addTeamModal = false;
            this.teams = [ ...this.teams, ...addedTeam ];
        },
        beforeEditTeam( teamId ) {
            [ this.currentEditTeam ] = this.teams.filter( team => team._id === teamId );
            console.log( this.currentEditTeam )
            this.editTeamModal = true;
        },
        editTeam( updatedTeam ) {
            let ind;
            this.teams.forEach( ( team, index ) => {
                if( team._id === updatedTeam._id ) {
                    ind = index;
                }
            });
            this.teams = [
                ...this.teams.slice( 0, ind ),
                updatedTeam,
                ...this.teams.slice( ind+1 )
            ]
            this.currentEditTeam = null;
            this.editTeamModal = false;
        },
        async excuseTeam( teamId ) {
            try {
                const response = await excuseTeam( teamId );
                this.$toast.success( `Left Team <strong>${response.name}</strong>` );

                let ind;
                this.teams.forEach( ( team, index ) => {
                    if( team._id === teamId ){
                        ind = index;
                    }
                });

                this.teams = [
                    ...this.teams.slice( 0, ind ),
                    ...this.teams.slice( ind + 1 )
                ]
            } catch ( error ) {
                this.$toast.error( error.response.data.message );
            }
        },
        async addMemberToTeam( teamId, event ) {
            const email = event.target.parentElement.children[0].value;
            try {
                let ind;
                const updatedTeam = await addMemberToTeam( teamId, [ email ] );
                // console.log( updatedTeam );
                this.$toast.success( `Added <strong>${email}</strong>` );

                this.teams.forEach( ( team, index ) => {
                    if( team._id === updatedTeam._id ) {
                        ind = index;
                    }
                });

                this.teams = [
                    ...this.teams.slice( 0, ind ),
                    updatedTeam,
                    ...this.teams.slice( ind + 1 )
                ]
            } catch ( error ) {
                // console.log( error );
                this.$toast.error( error.response.data.message );
            }
        }
    },
    mounted() {
        getAllTeamsByUserId()
                .then( response => {
                    this.status = LOADED;
                    this.teams = response;
                })
                .catch( error => {
                    this.status = ERROR_LOADING;
                    this.error = error;
                    // console.log( error );
                });
        getAllUsers()
            .then( response => {
                this.users = response;
            })
            .catch( error => {
                console.log( error );
            });
    }
}
</script>
<style scoped>
.card-text {
    font-weight:300;
}

.card {
    flex-basis: 100%
}

.d-flex {
    margin-bottom: 20px;
}

#users {
    height: 30px;
}

.btn-primary {
    height: 30px;
    padding-top: 3px;
}
</style>