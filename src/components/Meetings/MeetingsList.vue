<template>
    <div>
        <div class="container">
            <div v-if="status === 'LOADING'" >
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>Loading Meetings...</strong> 
                </div>
            </div>
            <div  v-if="status === 'ERROR_LOADING'" >
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>{{this.error.response.data.message}}</strong> 
                </div>
            </div>

            <div class="jumbotron jumbotron-fluid" v-if = "status === 'LOADED'  && this.meetings.length === 0">
                <div class="container">
                    <p class="lead text-center">No meetings found</p>
                </div>
            </div>

            <div v-else-if = "status === 'LOADED'  && this.meetings.length > 0">
                <h1>Meetings matching the criteria</h1>
                <hr>
                <div>
                    <div v-for="meeting in this.meetings" :key="meeting._id">
                        <div class="card">
                            <div class="card-body">
                                <div class="row title">
                                <h5 class="card-title">{{ meeting.date | formatDate }}</h5>
                                <p style="padding-left: 10px;">{{ meeting.startTime.hours | formatTime }}:{{ meeting.startTime.minutes | formatTime }} - {{ meeting.endTime.hours | formatTime }}:{{ meeting.endTime.minutes | formatTime }}</p>
                                </div>
                                <p class="card-text">{{meeting.name}}</p>
                                <button type="button" class="btn btn-danger" @click="excuseMeeting( meeting._id )" >Excuse Yourself</button>
                                <hr>
                                <strong>Attendees:</strong>
                                <div v-for='attendee in meeting.attendees' :key="attendee.userId" style="display: inline">
                                    <span class="badge badge-primary" style="margin-left: 10px;">{{ attendee.email }}</span>
                                </div>
                                <div style="padding-top:10px">
                                    <select name="users" id="users" style="margin-right: 10px;">
                                        <option disabled="disabled" value="">Select Member</option>
                                        <option v-for="user in users" :key="user._id" :value="user.email">{{user.email}}</option>
                                    </select>
                                    <button type="button" class="btn btn-primary"  @click="addMemberToMeeting( meeting._id, $event )">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { searchMeetings, excuseMeeting, addMemberToMeeting } from '@/services/meetings';
import { getAllUsers } from '@/services/users';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    components: {
    },
    props: ["period","searchWords"],
    data() {
        return {
            status: LOADING,
            meetings: null,
            users: null,
        }
    },
    methods: {
        searchMeetings() {
            searchMeetings( this.period, this.searchWords )
                .then( response => {
                    this.status = LOADED;
                    this.meetings = response;
                })
                .catch( error => {
                    this.status = ERROR_LOADING;
                    this.error = error;
                    // console.log( error );
                });
        },
        async excuseMeeting( meetingId ) {
            try {
                const response = await excuseMeeting( meetingId );
                this.$toast.success( `Left Meeting <strong>${response.name}</strong>` );

                let ind;
                this.meetings.forEach( ( meeting, index)  => {
                    if( meeting._id === meetingId ) {
                        ind = index
                    }
                });
                this.meetings = [
                    ...this.meetings.slice( 0, ind ),
                    ...this.meetings.slice( ind+1 )
                ]
            } catch ( error ) {
                this.$toast.error( error.response.data.message );
            }
        },
        async addMemberToMeeting( meetingId, event ) {
            const email =  event.target.parentElement.children[0].value;
            try{
                let ind;
                const updatedMeeting = await addMemberToMeeting( meetingId, [ email ] );
                // console.log( updatedMeeting );
                this.$toast.success( `Added <strong>${email}</strong>` );

                this.meetings.forEach( ( meeting, index ) => {
                            if( meeting._id === updatedMeeting._id ) {
                                ind = index;
                            }
                        });
                this.meetings = [
                    ...this.meetings.slice( 0, ind ),
                    updatedMeeting,
                    ...this.meetings.slice( ind + 1 )
                ];
            } catch( error ) {
                // console.log( error );
                this.$toast.error( error.response.data.message );
            }
        }
    },
    async mounted() {
        try {
            const response = await getAllUsers();
            this.users = response;
        } catch ( error ) {
            this.$toast.error( 'Error while fetching Options' );
        }

        this.searchMeetings();
    }
}
</script>
<style scoped>
.jumbotron {
    padding: 20px;
    border-radius: 4px;
}

.card {
    margin-top: 10px;
    margin-bottom: 10px;
}

.title {
    padding-left: 15px;
}

#users {
    height: 30px;
}

.btn-primary {
    height: 30px;
    padding-top: 3px;
}
</style>