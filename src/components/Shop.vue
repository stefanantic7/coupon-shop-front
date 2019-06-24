<template>
    <div>
        <div v-if="isAuth" class="mt-3">
            <button v-on:click="deleteShop" class="btn btn-danger float-right">Delete shop</button>
        </div>
        <h1>{{ shop.name }}</h1>

        <table class="table">
            <thead>
            <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Shop</th>
                <th scope="col">New Price</th>
                <th scope="col">OldPrice</th>
                <th scope="col">Discount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-bind:key="coupon.id" v-for="coupon in shop.coupons">
                <td>{{ coupon.product }}</td>
                <td>{{ shop.name }}</td>
                <td>{{ coupon.discountedPrice }}</td>
                <td>{{ coupon.originalPrice }}</td>
                <td>{{ coupon.percent }}%</td>
            </tr>
            </tbody>
        </table>
        <div v-if="shop.coupons.length===0" class="text-center">The table is empty</div>

    </div>
</template>

<script>
    import {apiBase} from "../main";
    import axios from "axios";

    export default {
        name: "Shop",

        data() {
            return {
                shop: {
                    name: "",
                    coupons: []
                },
            };
        },
        computed: {
            isAuth() {
                return this.$store.state.user;

            }
        },
        methods: {
            loadShop() {
                axios
                    .get(apiBase + "shops/"+this.$route.params.id, {
                        headers: {
                            Authorization: "Bearer "+localStorage.getItem("token")
                        }
                    })
                    .then(response => {
                        // eslint-disable-next-line no-console
                        console.log(response.data)
                        this.shop = response.data;
                    });
            },
            deleteShop() {
                axios
                    .delete(apiBase + "shops/"+this.$route.params.id, {
                        headers: {
                            Authorization: "Bearer "+localStorage.getItem("token")
                        }
                    })
                    .then(() => {
                        this.$router.push('/coupons');
                    });
            }
        },

        created() {
            this.loadShop();
        }
    };
</script>

<style scoped>

</style>
