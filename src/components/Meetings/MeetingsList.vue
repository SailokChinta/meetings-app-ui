<template>
    <div>
        <Navbar />

        <div class="row" v-if="status === 'LOADING'" >
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>Loading Meetings...</strong> 
            </div>
        </div>
        <div class="row" v-if="status === 'ERROR_LOADING'" >
            <div class="alert alert-primary alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <strong>{{this.error.response.data.message}}</strong> 
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '@/Navbar/Navbar';

const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    components: {
        Navbar
    }
}
</script>
<style lang="stylus" scoped>

</style>