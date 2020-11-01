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
        </div>
        <MeetingsList :period="this.period" :search-words="this.searchWords" ref="meetingList"/>
    </div>
</template>
<script>
import MeetingsList from './MeetingsList';

export default {
    components:{
        MeetingsList
    },
    data() {
        return{
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
        },
        searchMeetings() {
            this.$refs.meetingList.searchMeetings();
        }
    },
}
</script>
<style scoped>
.dropdown {
    margin-bottom: 20px;
}

.btn-dark {
    margin-top: 20px;
}

.unbold {
    font-weight: normal;
}
</style>