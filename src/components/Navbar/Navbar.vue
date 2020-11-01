<template>
    <div>  
        <nav class="navbar navbar-expand navbar-light bg-light">
            <ul class="nav navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/home">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/calendar">Calendar</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/meetings">Meetings</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/teams">Teams</router-link>
                </li>
            </ul>
            <div id="admin-panel">
                <ul class="nav navbar-nav navbar-right ml-auto">
                    <router-link class="nav-link" to="/admin">Admin</router-link>
                </ul>
            </div>
            <div id="log-out">
                <ul class="nav navbar-nav navbar-right ml-auto">
                    <button type="button" class="btn btn-danger" @click="logOutUser" >Log out</button>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { logOutUser, isAdmin } from "@/services/auth";
export default {
    name: 'Navbar',
    methods: {
        logOutUser() {
            logOutUser();
            this.$router.push({ name: 'login-page' });
        },
    },
    mounted() {
        if( isAdmin() ) {
            this.$el.querySelector( '#admin-panel' ).style.display='block';
        }
    }
}
</script>
<style scoped>
#log-out {
    border-left:1px solid lightgrey;
    padding-left: 10px;
}

#admin-panel {
    display: none;
}
</style>