<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

 const user = ref();
 onMounted(async ()=> {
    try {
        const data = await axios.get("/api/user");
        user.value = data.data;
    } catch (error) {
        console.log("EENGK!");
        console.log(error);
    }
    
 });
 
</script>
<template>
    <h1>Partner's Dashboard</h1>
    <h1>{{ user?.name }}</h1>
    <p>{{ user?.email }}</p>
    <p>{{ user?.user_type }}</p>
</template>