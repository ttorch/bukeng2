import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/f/Home.vue";
import Admin from "../components/b/admin/Dashboard.vue";
import Partner from "../components/b/partners/Dashboard.vue";

const routes = [
    { path: "/", name: "Home", component: Home }, 
    { path: "/admin/dashboard", name: "Admin", component: Admin }, 
    { path: "/partner/dashboard", name: "Partner", component: Partner }, 
    { path: "/login", name: "Login", component: ()=> import("../components/f/Login.vue") }, 
    { path: "/register", name: "Register", component: ()=> import("../components/f/Register.vue") }, 
    { path: "/otp", name: "VerifyOtp", component: ()=> import("../components/f/Otp.vue") }, 
    { path: "/verify-email", name: "VerifyEmail", component: ()=> import("../components/f/VerifyEmail.vue") }, 
    { path: "/listing-setup", name: "ListingSetup", component: ()=> import("../components/f/ListingSetup.vue") }, 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
