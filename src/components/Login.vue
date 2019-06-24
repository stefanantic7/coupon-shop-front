<template>
    <div>
        <form id="loginForm" v-on:submit="login($event)">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<style>

</style>
<script>
    import axios from "axios";
    import {apiBase} from "../main";

    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            login(event) {
                if(document.getElementById("loginForm").checkValidity()) {
                    document.getElementById("loginForm").checkValidity();
                    axios
                        .post(apiBase + "users/login", {
                            username: this.username,
                            password: this.password
                        })
                        .then(response => {
                            localStorage.setItem("token", response.data.token);
                            this.$store.commit("setUser", response.data.user);
                            this.$router.push('/coupons');
                        })
                        .catch((err) => {
                            // eslint-disable-next-line no-console
                            console.log(err.response);
                        });
                }
                else {
                    document.getElementById("loginForm").reportValidity();
                }
                event.preventDefault();
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
                        this.$router.push('/coupons');
                    });
            }
        }


    };
</script>
