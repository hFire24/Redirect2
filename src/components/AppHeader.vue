<script setup>
import SignIn from './SignIn.vue';
import useAuth from '../composables/useAuth'
const { userData, userIsAdmin } = useAuth();
</script>
<template>
    <nav>
        <SignIn/>
        <RouterLink to="/">Home</RouterLink>
        <!--RouterLink v-if="userData" to="/settings">Settings</RouterLink-->
        <RouterLink v-if="userIsAdmin" to="/admin">Admin</RouterLink>
        <!--RouterLink to="/custom">Custom Task</RouterLink-->
        <!--RouterLink to="/breaktime">Breaktime</RouterLink-->
        <!--RouterLink to="/music-slider">Music Slider</RouterLink-->
    </nav>
</template>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>