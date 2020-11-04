<template>
    <div>
        <div class="container">
            <br>
            <h1>Add Team</h1>
            <hr>
            <form @submit.prevent="addTeam">
                <div class="form-group">
                    <h4>Team Name</h4>
                    <input type="text" class="form-control" id="team-name" aria-describedby="" placeholder="Logistics, Payments" v-model="name" required>
                </div>
                <div class="form-group">
                    <h4>Team Short Name</h4>
                    <small class="form-text text-muted">Short should start with @ and - seperates the words </small>
                    <input type="text" class="form-control" id="team-short-name" placeholder=" @logistics, @payments-tech-support" v-model="shortName" required>
                </div>
                <h4>Description</h4>
                <div class="input-group">
                    <textarea name="team-description" placeholder="Deals with Payment related issues." id="team-description" class="form-control" aria-label="With textarea" v-model="description" required></textarea>
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
import { addTeam } from '@/services/teams';
import Multiselect from 'vue-multiselect';

export default {
    components: {
        Multiselect
    },
    props: ["users"],
    data() {
        return {
            options: [],
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
            
            try {
                const response = await addTeam( requestBody );
                this.$toast.success( `Created <strong>${response[0].name}</strong>` );
                this.$emit('submit-team', response);
            } catch ( error ) {
                    this.name = '';
                    this.shortName = '';
                    this.description = '';
                    this.members = []
                    this.$toast.error( error.response.data.message );
            }
        }
    },
    mounted() {
        this.options = this.users;
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