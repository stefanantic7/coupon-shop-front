import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Login from './components/Login.vue'
import Coupons from "./components/Coupons";
import CreateCoupon from "./components/CreateCoupon";
import Vuex from 'vuex'
import Shop from "./components/Shop";
import CreateShop from "./components/CreateShop";
import CreateUser from "./components/CreateUser";


export const apiBase = "http://localhost:8080/api/";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        user: null,
        errors: []
    },
    mutations: {
        setUser (state, newUser) {
            state.user = newUser
        },
        setErrors(state, errors) {
            state.errors = errors
        }
    }
});

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/coupons',
        component: Coupons
    },
    {
        path: '/coupons/create',
        component: CreateCoupon
    },
    {
        path: '/shops/create',
        component: CreateShop
    },
    {
        path: '/shops/:id',
        component: Shop
    },
    {
        path: '/users/create',
        component: CreateUser
    }
];

Vue.use(VueRouter);
const router = new VueRouter({
    routes // short for `routes: routes`
});

new Vue({
    router,
    store,
    render: h => h(App),
    el: '#app'
});
