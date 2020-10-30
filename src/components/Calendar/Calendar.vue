<template>
    <div>
        <Navbar />
        <div class = "container">
            <br />
            <h1 class="text-left">Calender</h1>
            <hr />
            <div class="date-picker">
                <input type="date" name="datepicker" id="date-picker" :value="this.selectedDate" @input="dateChangeHandler( $event )">
            </div>

            <div class = "row" v-if = "status === 'LOADING'">
                <div class = "col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>Loading Meetings...</strong>
                    </div>
                </div>
            </div>

            <div class = "row" v-if = "status === 'ERROR_LOADING'">
                <div class = "col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{this.error.response.data.message}}</strong>
                    </div>
                </div>
            </div>

            <div class="jumbotron jumbotron-fluid" v-if = "status === 'LOADED'  && this.meetings.length === 0">
                <div class="container">
                    <p class="lead text-center">No meetings on {{new Date( this.selectedDate ).toDateString()}}</p>
                </div>
            </div>

            <div class="row" v-else-if = "status === 'LOADED'  && this.meetings.length > 0 ">
                <div class="col-4 d-flex" v-for="meeting in this.meetings" :key="meeting._id">
                    <div class="card" style="width: 18rem;" >
                            <div class="card-body">
                                <h5 class="card-title">{{ meeting.name }}</h5>
                                <!-- <p class="card-text">{{ meeting.date }}</p> -->
                                <p class="card-text">{{ meeting.startTime.hours }} : {{ meeting.startTime.minutes }} - {{ meeting.endTime.hours }} : {{ meeting.endTime.minutes }}</p>
                                <hr>
                                <p class="card-text">{{ meeting.description }}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../Navbar/Navbar';
import { getMeetingsByDate } from '@/services/meetings';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            meetings: null,
            status: LOADING,
            selectedDate: new Date().toISOString().substring( 0, 10 )
        }
    },
    methods: {
        dateChangeHandler( event ) {
            this.selectedDate= event.target.value;
            this.getMeetingsByDate( this.selectedDate );
        },
        getMeetingsByDate( date ){
            getMeetingsByDate( date )
                .then( response => {
                    this.status = LOADED;
                    this.meetings = response;
                })
                .catch( error => {
                    this.status = ERROR_LOADING;
                    console.log( error );
                });
        }
    },
    mounted() {
        this.getMeetingsByDate( this.selectedDate );
    }
}
</script>
<style scoped>
    #date-picker {
        float: right 
    }
    .date-picker {
        height: 50px;
    }
    .jumbotron {
        border-radius: 4px;
    }
</style>