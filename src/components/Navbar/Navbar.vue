<template>
    <div>  
        <nav class="navbar navbar-expand navbar-light bg-light">
            <ul class="nav navbar-nav">
                <li class="nav-item active">
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
            <div style="display: inline; float: right">
                <ul class="nav navbar-nav navbar-right float-right">
                    <button type="button" class="btn btn-danger" @click="logOutUser" >Log out</button>
                </ul>
            </div>

        </nav>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    methods: {
        logOutUser() {
            localStorage.clear();
            this.$router.push({ name: 'login-page' });
        },
    }
}
</script>
<style scoped>

</style>