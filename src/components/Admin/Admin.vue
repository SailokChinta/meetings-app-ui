<template>
    <div>
        <Navbar />
        <div class="container">
            <div class="text-center panel">
                <h1>Admin Panel</h1>
            </div>
            <hr>
            <h2 class="text-center">
                Welcome {{ this.name }}
            </h2>
            <hr>
            <div class="file-upload">
                <h3><label for="meetings-upload">Upload Meetings</label></h3>
                <small>Files of .xslx extension are only supported</small>
                <br>
                <input type="file" name="meetings-upload" id="meetings" ref="meetings" v-on:change="handleFileUpload( $event )">
            </div>
            <hr>
            <div class="file-upload">
                <h3><label for="teams-upload">Upload Teams</label></h3>
                <small>Files of .xslx extension are only supported</small>
                <br>
                <input type="file" name="teams-upload" id="teams" ref="teams" v-on:change="handleFileUpload( $event )">
            </div>
        </div> 
    </div>  
</template>
<script>
import Navbar from '../Navbar/Navbar';
import { submitFile } from '@/services/admin';

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            name: localStorage.name,
        }
    },
    methods: {
        async handleFileUpload( event ) {
            const file = this.$refs[ event.target.id ].files[0];
            try {
                await submitFile( file, event.target.id );
            } catch ( error ) {
                this.$toast.error( error.response.data.message );
            }
        },
    }
}
</script>
<style scoped>
h3 {
    font-weight: 200;
}

.panel {
    background-color: lightgrey; 
    border-radius: 4px;
    height: 100px;
    margin-top: 8px;
}

h1 {
    font-weight: 300;
    font-size: 4.5rem;
}
</style>