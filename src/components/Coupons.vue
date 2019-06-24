<template>
    <div>
        <div class="mt-3">
            <router-link v-if="isAuth" :to="'/coupons/create'" class="btn btn-success float-right">New Coupon</router-link>
        </div>
        <h1>Coupons</h1>
        <select class="form-control" v-model="couponStatus" @change="getCoupons(1)">
            <option>ALL</option>
            <option>ACTIVE</option>
            <option>INACTIVE</option>
        </select>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Shop</th>
                <th scope="col">New Price</th>
                <th scope="col">OldPrice</th>
                <th scope="col">Discount</th>
                <th scope="col">Valid from</th>
                <th scope="col">Valid to</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-bind:key="coupon.id" v-for="coupon in coupons">
                <td>{{ coupon.product }}</td>
                <td>
                    <router-link :to="'/shops/'+coupon.shopId">{{ coupon.shop.name }}</router-link>
                </td>
                <td>{{ coupon.discountedPrice }}</td>
                <td>{{ coupon.originalPrice }}</td>
                <td>{{ coupon.percent }}%</td>
                <td>{{ coupon.validFrom }}</td>
                <td>{{ coupon.validTo }}</td>
                <td>
                    <button class="btn btn-danger" @click="deleteCoupon(coupon.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-if="coupons.length===0" class="text-center">The table is empty</div>

        <paginate v-model="currentPage"
                  :page-count="pagesCount"
                  :click-handler="getCoupons"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :page-link-class="'page-link'"
                  :prev-class="'page-item'"
                  :prev-link-class="'page-link'"
                  :next-class="'page-item'"
                  :next-link-class="'page-link'"
        ></paginate>
    </div>
</template>

<script>
    import {apiBase} from "../main";
    import axios from "axios";
    import Paginate from 'vuejs-paginate'

    export default {
        name: "Coupons",

        components: {Paginate},

        data() {
            return {
                pagesCount: 1,
                currentPage: 1,
                coupons: [],
                couponStatus: "ALL"
            };
        },
        computed: {
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
        methods: {
            getCoupons(pageNumber=1) {
                this.currentPage=pageNumber;
                axios
                    .get(apiBase + "coupons", {
                        params: {
                            page: pageNumber,
                            limit: 5,
                            status: this.couponStatus
                        },
                        headers: {
                            Authorization: "Bearer "+localStorage.getItem("token")
                        }
                    })
                    .then(response => {
                        this.pagesCount = response.data.pages;
                        this.coupons = response.data.data;
                    });
            },
            deleteCoupon(couponId) {
                axios
                    .delete(apiBase + "coupons/"+couponId, {
                        headers: {
                            Authorization: "Bearer "+localStorage.getItem("token")
                        }
                    })
                    .then(() => {
                        this.getCoupons(this.httpAgent)
                    });
            }
        },

        created() {
            this.getCoupons();
        }
    };
</script>

<style scoped>

</style>
