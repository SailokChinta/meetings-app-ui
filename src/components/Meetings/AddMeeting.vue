<template>
    <div>
        <div class="container">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <form @submit.prevent="addMeeting">
                        <h1 class="display-5">Add a new Meeting</h1>
                        <hr class="my-2">

                        <h4 class="unbold">
                            Meeting name
                        </h4>
                        <input name="name" class="form-control form-control-lg" id="meeting-name" type="text" placeholder="Daily Sprint" v-model="name" required>

                        <h4 class="unbold">
                            Date
                        </h4>
                        <input name="date" type="date" class="date-picker" v-model="date" required>

                        <h4 class="unbold">
                            Description
                        </h4>
                        <div class="input-group">
                            <textarea name="description" class="form-control" aria-label="With textarea" placeholder="What is the agenda of the meeting?" v-model="description"></textarea>
                        </div>

                        <h4 class="unbold">
                            Start time (hh:mm)
                        </h4>
                        <div class="time">
                            <select name="start-hours" id="time" v-model="startTimeHours">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 23" :key='index'> {{index}} </option>
                            </select>
                            :
                            <select name="start-minutes" id="time" v-model="startTimeMinutes">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 59" :key='index'> {{index}} </option>
                            </select>
                        </div>

                        <h4 class="unbold">
                            End time (hh:mm)
                        </h4>
                        <div class="time">
                            <select name="end-hours" id="time" v-model="endTimeHours">
                                 <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 23" :key='index'> {{index}} </option>
                            </select>
                            :
                            <select name="end-minutes" id="time" v-model="endTimeMinutes">
                                <option value="0" selected> 0 </option>
                                <option :value="index" v-for="index in 59" :key='index'> {{index}} </option>
                            </select>
                        </div>

                        <h4 class="unbold">
                            EmailIDs of attendees or teams's short
                        </h4>
                        <multiselect v-model="attendees" tag-placeholder="Add this as new tag" placeholder="john@example, @annual-day" label="name" track-by="id" :options="options" :multiple="true" :taggable="true"></multiselect>
                        <p>seperate emailids / team's short names by commas - teams short names always start with @</p>

                        <p class="lead">
                            <input type="submit" class="btn btn-dark" value="Add Meeting" />
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { addMeeting } from '@/services/meetings';
import { getAllTeams } from '@/services/teams';
import { getAllUsers } from '@/services/users';
import Multiselect from 'vue-multiselect';

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            options: [],
            name: '',
            date: '',
            description: '',
            startTimeHours: 0,
            startTimeMinutes: 0,
            endTimeHours: 0,
            endTimeMinutes: 0,
            attendees: [],
        }
    },
    methods: {
        addMeeting() {
            const userAttendees = [];
            const teamAttendees = [];
            this.attendees.forEach( attendee => {
                if( attendee.type === 'user' ) {
                    userAttendees.push( attendee.name );
                } else if ( attendee.type === 'team' ) {
                    teamAttendees.push( attendee.name.slice(1) );
                }
            });
            const requestBody = {
                name: this.name,
                date: this.date,
                description: this.description,
                startTime: {
                    hours: this.startTimeHours,
                    minutes: this.startTimeMinutes
                },
                endTime: {
                    hours: this.endTimeHours,
                    minutes: this.endTimeMinutes
                },
                attendees: userAttendees,
                teams: teamAttendees
            };
            // console.log( this.attendees );
            addMeeting( requestBody )
                .then( response => {
                    this.meetings = response;
                    this.$toast.success( 'Succesfully added a Meeting' )
                })
                .catch( error => {
                    this.$toast.error( error.response.data.message );
                    // console.log( error );
                });
            this.name = '';
            this.date = '';
            this.description = '';
            this.startTimeHours = 0;
            this.startTimeMinutes = 0;
            this.endTimeHours = 0;
            this.endTimeMinutes = 0;
            this.attendees = []
        }
    },
    async mounted() {
        try {
            let response = await getAllTeams();
            const teams = response;
            teams.forEach( team => {
                this.options.push({ id: team._id, type: 'team', name: team.shortName[0] === '@' ? team.shortName : `@${team.shortName}`});
            });

            response = await getAllUsers();
            const users = response;
            users.forEach( user => {
                this.options.push( { id: user._id, type: 'user', name: user.email} );
            });
        } catch ( error ) {
            this.$toast.error( 'Error while fetching Options' );
        }
    }
}
</script>
<style  src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
.btn-dark {
    margin-top: 20px;
}

#time {
    padding-right: 20px;
    border-radius: 4px;
    height: 30px;
}

.time {
    margin-bottom: 20px;
}

.jumbotron {
    padding: 20px;
    border-radius: 4px;
}

.date-picker, .input-group, #meeting-name {
    width: 100%;
    margin-bottom: 20px;
}
</style>