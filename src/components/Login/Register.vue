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
                            <h5 class="card-title text-center">Sign Up</h5>
                            <form class="form-signin" @submit.prevent= 'registerUser' >
                                <div class="form-label-group">
                                    <label for="inputName">Name</label>
                                    <input v-model="data.name" type="text" id="inputName" class="form-control" placeholder="John Doe" required autofocus>
                                </div>
                                <div class="form-label-group">
                                    <label for="inputEmail">Email address</label>
                                    <input v-model="data.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                                </div>

                                <div class="form-label-group">
                                    <label for="inputPassword">Password</label>
                                    <input v-model="data.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                                </div>
                                <br />
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { setAuthenticationDetails } from '@/services/auth';
import { registerUser } from "@/services/users";

export default {
    name: 'Login',
    data() {
        return {
            data: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async registerUser() {
            try {
                const response = await registerUser( this.data );
                console.log( this.data );
                setAuthenticationDetails( response );


                this.$toast.success( 'Successfully Registered' );
                this.$router.push( { name: 'login-page' } );
            } catch ( error ) {
                this.$toast.error( error.response.data.message );
            }
        }
    }
}
</script>
<style scoped>
</style>