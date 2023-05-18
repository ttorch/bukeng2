import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: null
    }),
    getters: {
        user: (state) => state.authUser,
    },
    actions: {
        async getToken (){
            await axios.get("/sanctum/csrf-cookie");
        },
        async getUser() {
            await this.getToken();
            const data = await axios.get("/api/user");
            this.authUser = data.data;
        },
        async handleLogin (data) {
            await this.getToken();
            await axios.post('/login', {
                email: data.email,
                password: data.password
            });
            await this.getUser();
            const is_verified = await this.verifyUser();
            if (!is_verified) {
                this.router.push("/otp");
                return;
            }
            this.authRedirect();
        },
        async handleRegister (data) {
            await this.getToken();
            await axios.post('/register?ut=customer', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                user_type: data.user_type,
            });
            this.authRedirect();
        },
        async handleRegisterPartner (data) {
            await this.getToken();
            await axios.post('/register?ut=partner', {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
                user_type: data.user_type,
            });
            this.authRedirect();
        },
        async authRedirect() {
            if (this.authUser==null){
                console.log("this.authUser initially null");
                await this.getUser();
            }
            
            if (this.authUser.user_type == 'Customer') {
                this.router.push("/");
            }

            if (this.authUser.user_type == 'Partner') {
                this.router.push("/partner/dashboard");
            }

            if (this.authUser.user_type == 'Admin') {
                this.router.push("/admin/dashboard");
            }
        },
        async handleLogout() {
            await axios.post('/logout');
            this.authUser=null;
        },
        async verifyUser(){
            console.log("VerifyUser", this.authUser && this.authUser.email_verified_at !=null);
            return this.authUser && this.authUser.email_verified_at !=null;
        },
    }
})