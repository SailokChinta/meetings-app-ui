<template>
    <div>  
        <nav class="navbar navbar-expand navbar-light bg-light">
            <ul class="nav navbar-nav mr-auto">
                <span style="font-size: 1.5rem;">Welcome, {{ this.user.name }}</span>
            </ul>
            <div id="log-out">
                <ul class="nav navbar-nav navbar-right ml-auto">
                    <button type="button" class="btn btn-danger" @click="logOutUser" >Log out</button>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import { logOutUser, getUser } from "@/services/auth";
export default {
    name: 'AdminNavbar',
    data() {
        return {
            user: getUser()
        }
    },
    methods: {
        logOutUser() {
            logOutUser();
            this.$router.push({ name: 'login-page' });
        },
    }
}
</script>
<style scoped>
#log-out {
    border-left:1px solid lightgrey;
    padding-left: 10px;
}
</style>