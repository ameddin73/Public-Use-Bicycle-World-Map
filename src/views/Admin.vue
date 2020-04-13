<!--
  - Copyright (c) 2020 Alex Meddin
  -  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
  -  This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
  -  You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
  -
  -  Alex Meddin github.com/ameddin73 ameddin73@gmail.com
  -->

<template>
    <div class="admin">
        <h1>Admin</h1>
        <div id="sign-in" v-show="!user.id">
            <button v-google-signin-button="clientId" class="google-signin-button">
                <img src="../assets/google_logo.png" alt="Google" class="google-button__icon">
                Sign in with Google
            </button>
        </div>
        <div id="not-allowed" v-show="user.id && user.role !== 'admin'">
            Sorry, you're not authorized to see this page.
        </div>
        <div id="admin-panel" v-show="user.role === 'admin'">
            Logged in as {{ $session.get('user') }}.
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueSession from 'vue-session/index.esm';
    import GoogleSignInButton from 'vue-google-signin-button-directive';
    import axios from "axios";

    Vue.use(VueSession);

    export default {
        name: 'Admin',

        directives: {
            GoogleSignInButton,
        },
        data() {
            return {
                clientId: '',
                user: {},
            }
        },
        created() {
            this.$set(this.clientId = process.env.VUE_APP_GOOGLE_CLIENT_ID);
        },
        mounted() {
            this.$session.clear();
        },
        methods: {
            OnGoogleAuthSuccess: function (idToken) {
                this.$session.set('idToken', idToken);

                axios.get('http://localhost:3000/api/v1/users/validate', {
                    params: {
                        idToken: idToken,
                    },
                })
                    .then(response => {
                        this.$set(this.user = response.data);
                        this.$session.set('user', response.data);
                    })
                    .catch(error => (console.log(error)));
            },
            OnGoogleAuthFail: function (err) {
                console.error(err);
            }
        },
    }

</script>

<style>
    .google-signin-button {
        margin-top: 150px;
        height: 150px;
        border-width: 0;
        background: white;
        color: #737373;
        border-radius: 5px;
        white-space: nowrap;
        box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
        transition-property: background-color, box-shadow;
        transition-duration: 150ms;
        transition-timing-function: ease-in-out;
        padding-left: 24px;
        padding-right: 24px;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        font-weight: bold;
        font-family: 'Roboto', arial, sans-serif;
    }


    .google-signin-button:focus, .google-signin-button:hover {
        box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .google-signin-button:active {
        background-color: #e5e5e5;
        box-shadow: none;
        transition-duration: 10ms;
    }

    .google-button__icon {
        display: block;
        vertical-align: middle;
        margin: 8px 0 8px 8px;
        width: 100px;
        height: 100px;
        box-sizing: border-box;
    }
</style>