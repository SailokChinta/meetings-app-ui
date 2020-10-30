<template>
    <div>
        <div class="container">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-5">Search for Meetings</h1>
                    <hr class="my-2">
                    <div class="dropdown">
                        <h4 class="unbold">
                            Period
                        </h4>
                        <div class="form-group">
                            <select class="form-control" id="exampleFormControlSelect1 period" name="period" @change="inputChangeHandler( $event )">
                                <option value="TODAY">TODAY</option>
                                <option value="PAST">PAST</option>
                                <option value="UPCOMING">UPCOMING</option>
                                <option value="ALL">ALL</option>
                            </select>
                        </div>
                    </div>
                    <h4 class="unbold">
                        Search for 
                    </h4>
                    <div class="input-group">
                        <textarea name="search-words" class="form-control" aria-label="With textarea" @change="inputChangeHandler( $event )"></textarea>
                    </div>
                    <p class="lead">
                        <button type="button" class="btn btn-dark" @click="searchMeetings">Search</button>
                    </p>
                </div>
            </div>
            <div class="row" v-if="status === 'LOADING'" >
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span class="sr-only">Close</span>
                    </button>
                    <strong>Loading Meetings...</strong> 
                </div>
            </div>
            <div class="row" v-if="status === 'ERROR_LOADING'" >
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
                                <h5 class="card-title">{{ `${new Date(meeting.date).getDate()} ${new Date(meeting.date).toLocaleString('default', { month: 'long' })} ${new Date(meeting.date).getFullYear()}` }}</h5>
                                <p style="padding-left: 10px;">{{meeting.startTime.hours}}:{{meeting.startTime.minutes}} - {{meeting.endTime.hours}}:{{meeting.endTime.minutes}}</p>
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
    data() {
        return{
            meetings: null,
            users: null,
            status: LOADING,
            period: 'TODAY',
            searchWords: '',
        }
    },
    methods: {
        inputChangeHandler ( event ) {
            if( event.target.name === 'period' ) {
                this.period = event.target.value;
            }
            if( event.target.name === 'search-words' ) {
                this.searchWords = event.target.value;
            }

            console.log( this.period, this.searchWords );
        },
        searchMeetings() {
            searchMeetings( this.period, this.searchWords )
                .then( response => {
                    this.status = LOADED;
                    this.meetings = response;
                })
                .catch( error => {
                    this.status = ERROR_LOADING;
                    console.log( error );
                });
        },
        excuseMeeting( meetingId ) {
            excuseMeeting( meetingId )
                .then( response => {
                    response;
                })
                .catch( error => {
                    console.log( error );
                });
                
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
        },
        async addMemberToMeeting( meetingId, event ) {
            const email =  event.target.parentElement.children[0].value;
            
            try{
                let ind;
                const updatedMeeting = await addMemberToMeeting( meetingId, [ email ] );
                console.log( updatedMeeting );
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
                console.log( error );
            }
        }
    },
    mounted(){
        getAllUsers()
            .then( response => {
                this.users = response;
            })
            .catch( error => {
                console.log( error );
            });
        this.searchMeetings();
        // console.log( this.users );
    }
}
</script>
<style scoped>
.dropdown {
    margin-bottom: 20px;
}

.btn-dark {
    margin-top: 20px;
}

.jumbotron {
    padding: 20px;
    border-radius: 4px;
}

.unbold {
    font-weight: normal;
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