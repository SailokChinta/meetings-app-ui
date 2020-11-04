<template>
    <div>
        <div class="container">
            <br />
            <br />
            <h1 class="text-center">Meetings App</h1>
            <hr />
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5" style="margin-bottom: 0 !important;">
                        <div class="card-body">
                            <h5 class="card-title text-center">Sign In</h5>
                            <form class="form-signin" @submit.prevent= 'loginUser' >
                                <div class="form-label-group">
                                    <label for="inputEmail">Email address</label>
                                    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                                </div>

                                <div class="form-label-group">
                                    <label for="inputPassword">Password</label>
                                    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                                </div>
                                <br />
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                    <small>Don't have an account, <router-link to="/register">Sign up</router-link>.</small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { authenticateUser, setAuthenticationDetails, isAdmin } from '@/services/auth';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async loginUser() {
            try {
                const response = await authenticateUser( this.email, this.password );
                setAuthenticationDetails( response );
        
                this.$toast.success( 'Successfully logged in' );

                if( isAdmin() ) {
                    this.$router.push( { name: 'admin' } );
                } else {
                    this.$router.push( { name: 'home' } );
                }
            } catch ( error ) {
                this.email = '';
                this.password = '';
                console.log( error );
                this.$toast.error( error.response.data.message );
            }
        }
    }
}
</script>
<style scoped>
</style>