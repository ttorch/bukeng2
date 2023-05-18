<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from "../../stores/auth"

const authStore = useAuthStore();
 onMounted(async ()=> {
    if (authStore.user == null) {
        await authStore.getUser();
    } 
 });
 
</script>
<template>
    <div v-if="authStore.user">
        <h1>{{ authStore.user?.name }}</h1>
        <p>{{ authStore.user?.email }}</p>
        <p>{{ authStore.user?.user_type }}</p>
    </div>
    
</template>