<template>
    <div>
        <v-app>
            <v-data-table 
            :headers="columns" 
            :items="users" 
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
import { getAllUsers } from '@/services/admin';

export default {
    data(){
        return {
            users: [],
            columns: [
                { text: 'Id', value: '_id' },
                { text: 'Name', value: 'name', sortable: true },
                { text: 'Email', value: 'email' },
            ],
            search: ''
        }
    },
    async mounted() {
        try {
            this.users = await getAllUsers();
        } catch( error ) {
            this.$toast.error( error.response.data.message );
        }
    }
}
</script>
<style scoped>
</style>