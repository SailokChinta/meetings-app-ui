<template>
    <div>
        <div class="container">
            <br />
            <br />
            <h1 class="text-center">Mettings App</h1>
            <hr />
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
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
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { authenticateUser } from '@/services/auth';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        loginUser() {
            authenticateUser( this.email, this.password )
                .then( response => {
                    localStorage.setItem( 'token', response.token );
                    localStorage.setItem( 'email', response.email );
                    localStorage.setItem( 'name', response.name );
                    this.$router.push( 'home' );
                })
                .catch( error => {
                    console.log( error );
                    alert( 'Incorrect details' );
                });
            
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>