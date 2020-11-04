<template>
    <div>
        <AdminNavbar />
        <div class="container">
            <div class="text-center panel">
                <h1>Admin Panel</h1>
            </div>
            <hr>
            <div class="row">
                <div class="col-12 clearfix">
                    <router-link :to="{ name: 'admin-users' }" class = "mr-3" >
                        Users
                    </router-link>
                    <router-link :to="{ name: 'admin-meetings' }" class = "mr-3">
                        Meetings
                    </router-link>
                    <router-link :to="{ name: 'admin-teams' }" class = "mr-3">
                        Teams
                    </router-link>
                    <router-link :to="{ name: 'admin-uploads' }">
                        Uploads
                    </router-link>
                </div>
            </div>
            <hr>
            <router-view></router-view>
        </div> 
    </div>  
</template>
<script>
import AdminNavbar from '../Navbar/AdminNavbar';

export default {
    components: {
        AdminNavbar,    
    },
}
</script>
<style src="vuetify/dist/vuetify.min.css">
</style>
<style scoped>
.panel {
    background-color: lightgrey; 
    border-radius: 4px;
    height: 150px;
    margin-top: 8px;
    padding-top: 20px;
}

h1 {
    font-weight: 300;
    font-size: 4.5rem;
}
</style>