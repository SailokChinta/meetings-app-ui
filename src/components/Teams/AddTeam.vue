<template>
    <div>
        <div class="container">
            <br>
            <h1>Add Team</h1>
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

            <form @submit.prevent="addTeam">
                <div class="form-group">
                    <h4>Team Name</h4>
                    <input type="text" class="form-control" id="team-name" aria-describedby="" placeholder="Logistics, Payments" v-model="name">
                </div>
                <div class="form-group">
                    <h4>Team Short Name</h4>
                    <small class="form-text text-muted">Short should start with @ and - seperates the words </small>
                    <input type="text" class="form-control" id="team-short-name" placeholder=" @logistics, @payments-tech-support" v-model="shortName">
                </div>
                <h4>Description</h4>
                <div class="input-group">
                    <textarea name="team-description" placeholder="Deals with Payment related issues." id="team-description" class="form-control" aria-label="With textarea" @change="inputChangeHandler( $event )" v-model="description"></textarea>
                </div>
                <div>
                    <h4>Add Members</h4>
                    <multiselect v-model="members" tag-placeholder="Add this as new tag" placeholder="Search for a team member" label="email" track-by="email" :options="options" :multiple="true" :taggable="true"></multiselect>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import { getAllUsers } from '@/services/users';
import { addTeam } from '@/services/teams';
import Multiselect from 'vue-multiselect';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';
export default {
    components: {
        Multiselect
    },
    data() {
        return {
            options: [],
            status: LOADING,
            name: '',
            shortName: '',
            description: '',
            members: []
        }
    },
    methods: {
        async addTeam() {
            const requestBody = {
                name: this.name,
                shortName: this.shortName,
                description: this.description,
                members: this.members.map( member => member.email )
            }

            addTeam( requestBody )
                    .then( response => {
                        response;
                        this.$emit('close-modal');
                    })
                    .catch ( error => {
                        this.name = '';
                        this.shortName = '';
                        this.description = '';
                        this.members = []
                        error;
                    });
        }
    },
    async mounted() {
        try { 
            const response = await getAllUsers();
            this.status = LOADED;
            const users = response;
            users.forEach( user => {
                this.options.push( {email: user.email} );
            });
        } catch ( error ) {
            this.status = ERROR_LOADING;
            this.error = error;
        }
    }
}
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
#team-description {
    margin-bottom: 20px;
}

#option {
    background-color: gray;
}

.btn {
    margin-top: 20px;
}

#users {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    padding-left: 5px;
    background-color: white;
    border-radius: 4px;
    border-color: lightgray;
}
</style>