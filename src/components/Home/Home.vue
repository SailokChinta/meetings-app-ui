<template>
    <div>
        <Navbar />

        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Welcome  {{ this.name }} </h1>
                <hr class="my-2">
                <p class="lead">
                    <p>Click here to
                        <router-link to="/Calendar">view calendar</router-link>
                    </p>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '../Navbar/Navbar';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            name: ''
        }
    },
    mounted(){
        if( localStorage.getItem( 'name' ) ) {
            this.name = localStorage.getItem( 'name' );
        }
    }
}
</script>
<style scoped>

</style>