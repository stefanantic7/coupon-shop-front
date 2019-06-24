<template>

    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">CouponShop</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li v-if="isAuth" class="nav-item">
                        <router-link :to="'/coupons'" class="nav-link">Coupons</router-link>
                    </li>
                    <li v-if="isAuth" class="nav-item">
                        <router-link :to="'/shops/create'" class="nav-link">Create shop</router-link>
                    </li>
                    <li v-if="isAdmin" class="nav-item">
                        <router-link :to="'/users/create'" class="nav-link">Create user</router-link>
                    </li>
                </ul>
                <div v-if="isAuth" class="form-inline my-2 my-lg-0">
                    <button v-on:click="logout" class="btn btn-outline-warning my-2 my-sm-0" type="submit">Logout</button>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="text-right">{{ fullName }}</div>
        </div>
        <div class="container mt-3">
            <errors></errors>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import {apiBase} from "./main";
    import Errors from "./components/Errors";

    export default {
        name: "app",

        components: {Errors},

        data() {
            return {
                coupons: [],
                shops: []
            };
        },

        methods: {
            logout() {
                this.$store.commit("setUser", null);
                localStorage.clear();
                this.$router.push('/login');
            }
        },
        computed: {
            fullName () {
                if(!this.$store.state.user) {
                    return "";
                }
                let firstName = this.$store.state.user.firstName;
                if (!firstName) {
                    firstName = "";
                }
                let lastName = this.$store.state.user.lastName;
                if (!lastName) {
                    lastName = "";
                }
                return firstName+" "+lastName;
            },
            isAdmin() {
                if(!this.$store.state.user) {
                    return false;
                }
                return this.$store.state.user.privilegeLevel === "ADMINISTRATOR";
            },
            isAuth() {
                return this.$store.state.user;

            }
        },

        created() {
            const token = localStorage.getItem("token");
            if (!token) {
                this.$router.push('/login');
            }
            else {
                axios
                    .get(apiBase + "users/find", {
                        headers: {
                            Authorization: "Bearer "+localStorage.getItem("token")
                        }
                    })
                    .then(response => {
                        this.$store.commit("setUser", response.data);
                    })
                    .catch(() => {
                        this.logout()
                    });
            }
        },
        watch: {
            '$route' () {
                this.$store.commit("clearErrors");
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
