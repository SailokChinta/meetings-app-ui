<template>
    <div>
        <div class="container">
            <br>
            <h1>Edit Team</h1>
            <hr>
            <form @submit.prevent="editTeamDetails">
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
                    <textarea name="team-description" placeholder="Deals with Payment related issues." id="team-description" class="form-control" aria-label="With textarea" v-model="description"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import { editTeamDetails } from '@/services/teams';

export default {
    data() {
        return {
            name: this.team.name,
            shortName: this.team.shortName,
            description: this.team.description,
        }
    },
    props: [ "team" ],
    methods: {
        async editTeamDetails() {
            const requestBody = {
                name: this.name,
                shortName: this.shortName,
                description: this.description,
            }

            try {
                const response  = await editTeamDetails( this.team._id, requestBody );
                this.$toast.success( 'Updated Team Details' );
                this.$emit('edit-team', response);
            } catch ( error ) {
                this.name = '';
                this.shortName = '';
                this.description = '';
                this.$toast.error( error.response.data.message );
            }
        }
    },
}
</script>
<style scoped>
#team-description {
    margin-bottom: 20px;
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