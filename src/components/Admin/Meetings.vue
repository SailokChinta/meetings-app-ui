<template>
    <div>
        <v-app>
            <v-data-table 
            :headers="columns" 
            :items="meetings" 
            :items-per-page="5" 
            :footer-props="{
                'items-per-page-options': [ 5, 10, 20 ]
            }"
            :search="search" class="elevation-1" >
                <template v-slot:top>
                    <v-text-field   v-model="search" label="Search" class="mx-4"></v-text-field>
                </template>
            </v-data-table>
        </v-app>
    </div>  
</template>
<script>
import { getAllMeetings } from '@/services/admin';

export default {
    data(){
        return {
            meetings: [],
            columns: [
                { text: 'Id', value: '_id' },
                { text: 'Name', value: 'name', sortable: true },
            ],
            search: ''
        }
    },
    async mounted() {
        try {
            this.meetings = await getAllMeetings();
        } catch( error ) {
            this.$toast.error( error.response.data.message );
        }
    }
}
</script>
<style scoped>
</style>