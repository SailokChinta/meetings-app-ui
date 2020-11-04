<template>
    <div>
        <Navbar />

        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Welcome  {{ this.user.name }} </h1>
                <hr class="my-2">
                <p class="lead">
                    <p>Click here to
                        <router-link to="/calendar">view calendar</router-link>
                    </p>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../Navbar/Navbar';
import { getUser } from '@/services/auth';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            user: getUser()
        }
    },
}
</script>
<style scoped>

</style>