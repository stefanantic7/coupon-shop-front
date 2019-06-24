<template>
    <div>
        <form v-on:submit.prevent="true" v-on:keyup.enter="login">
            <div class="form-group">
                <label for="name">Shop name:</label>
                <input type="text" class="form-control" id="name" v-model="name" placeholder="Enter shop name">
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
        name: "CreateShop",
        data() {
            return {
                name: "",
            }
        },
        methods: {
            create() {
                axios
                    .post(apiBase + "shops",
                        {
                            name: this.name,
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
                    })
            },

        },
        created() {
        }

    };
</script>
