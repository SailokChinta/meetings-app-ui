<template>
    <div>
        <Navbar />
        <div class="container">
            <div class="row">
                <div class="col-12 clearfix">
                    <div class="clearfix">
                        <h1>Meetings</h1>
                        <hr> 
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 clearfix">
                    <router-link :to="{ name: 'search-meeting' }" class = "mr-3" >
                        Filter / Search Meeting
                    </router-link>
                    <router-link :to="{ name: 'add-meeting' }">
                        Add Meeting
                    </router-link>
                </div>
            </div>
            <hr>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import Navbar from '../Navbar/Navbar';

export default {
    components: {
        Navbar
    }
}
</script>
<style scoped>
.container {
    margin-bottom: 20px;
}
</style>