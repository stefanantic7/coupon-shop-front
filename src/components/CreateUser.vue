<template>
    <div>
        <form v-on:submit.prevent="true" v-on:keyup.enter="login">
            <div class="form-group">
                <label for="firstName">First name:</label>
                <input type="text" class="form-control" id="firstName" v-model="firstName" placeholder="Enter first name">
            </div>
            <div class="form-group">
                <label for="lastName">Last name:</label>
                <input type="text" class="form-control" id="lastName" v-model="lastName" placeholder="Enter last name">
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password">
            </div>
            <div class="form-group">
                <label for="privilegeLevel">Privilege level:</label>
                <select class="form-control" id="privilegeLevel" v-model="privilegeLevel">
                    <option>ADMINISTRATOR</option>
                    <option>OPERATOR</option>
                </select>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="create">Submit</button>
        </form>
    </div>
</template>
<style>

</style>
<script>
    import axios from "axios";
    import {apiBase} from "../main";

    export default {
        name: "CreateUser",
        data() {
            return {
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                privilegeLevel: ""
            }
        },
        methods: {
            create() {
                axios
                    .post(apiBase + "users",
                        {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            username: this.username,
                            password: this.password,
                            privilegeLevel: this.privilegeLevel
                        },
                        {
                            headers: {
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        }
                    )
                    .then(() => {
                        this.$router.push('/coupons');
                    })
                    .catch((err) => {
                        const errors = [];
                        err.response.data.forEach(error => errors.push(error.message));
                        this.$store.commit("setErrors", errors);
                    });
            },

        },
        created() {
        }

    };
</script>
