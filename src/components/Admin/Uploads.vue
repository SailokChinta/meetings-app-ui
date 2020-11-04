<template>
    <div>
        <div class="container">
            <div class="file-upload">
                <h3><label for="meetings-upload">Upload Meetings</label></h3>
                <small>Files of .xlsx extension are only supported</small>
                <br>
                <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="meetings-upload" id="meetings" ref="meetings" v-on:change="handleFileUpload( $event )">
            </div>
            <hr>
            <div class="file-upload">
                <h3><label for="teams-upload">Upload Teams</label></h3>
                <small>Files of .xlsx extension are only supported</small>
                <br>
                <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" name="teams-upload" id="teams" ref="teams" v-on:change="handleFileUpload( $event )">
            </div>
        </div> 
    </div>  
</template>
<script>
import { submitFile } from '@/services/admin';

export default {
    methods: {
        async handleFileUpload( event ) {
            const file = this.$refs[ event.target.id ].files[0];
            try {
                await submitFile( file, event.target.id );
                event.target.value="";
                this.$toast.success( `Uploaded <strong>${file.name}</strong>` );
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