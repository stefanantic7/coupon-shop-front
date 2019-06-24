<template>
    <div>
        <form v-on:submit.prevent="true" v-on:keyup.enter="login">
            <div class="form-group">
                <label for="product">Product:</label>
                <input type="text" class="form-control" id="product" v-model="product" placeholder="Enter product name">
            </div>
            <div class="form-group">
                <label for="originalPrice">Original price:</label>
                <input type="text" class="form-control" id="originalPrice" v-model="originalPrice" placeholder="Enter original price">
            </div>
            <div class="form-group">
                <label for="discountedPrice">Discounted price:</label>
                <input type="text" class="form-control" id="discountedPrice" v-model="discountedPrice" placeholder="Enter discounted price">
            </div>
            <div class="form-group">
                <label for="validFrom">Valid From:</label>
                <datepicker id="validFrom" v-model="validFrom" :format="'yyyy-MM-dd'"></datepicker>
            </div>
            <div class="form-group">
                <label for="validTo">Valid To:</label>
                <datepicker id="validTo" v-model="validTo" :format="'yyyy-MM-dd'"></datepicker>
            </div>
            <div class="form-group">
                <label for="shopId">Shop:</label>
                <select class="form-control" id="shopId" v-model="shopId">
                    <option v-bind:key="shop.id" v-for="shop in shops" :value="shop.id">{{shop.name}}</option>
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
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: "CreateCoupon",
        components: {Datepicker},
        data() {
            return {
                shops: [],
                product: "",
                originalPrice: "",
                discountedPrice: "",
                validFrom: "",
                validTo: "",
                shopId: ""
            }
        },
        methods: {
            formatDate(date) {
                if (date==="") {
                    return "";
                }
                let dd = date.getDate();
                let mm = date.getMonth() + 1; //January is 0!

                const yyyy = date.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                return yyyy+'-'+mm+'-'+dd;
            },
            create() {
                axios
                    .post(apiBase + "coupons",
                        {
                            product: this.product,
                            originalPrice: +this.originalPrice,
                            discountedPrice: +this.discountedPrice,
                            validFrom: this.formatDate(this.validFrom),
                            validTo: this.formatDate(this.validTo),
                            shopId: +this.shopId
                        },
                        {
                            headers: {
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        }
                    )
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response.data)
                        this.$router.push('/coupons');
                    });
            },
            loadShops() {
                axios
                    .get(apiBase + "shops/all",
                        {
                            headers: {
                                Authorization: "Bearer "+localStorage.getItem("token")
                            }
                        }
                    )
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response.data[0].id);
                        this.shops = response.data;
                    });
            }
        },
        created() {
            this.loadShops();
        }


    };
</script>
