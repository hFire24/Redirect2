<script setup>
  import NewBreak from '../components/admin/NewBreak.vue'
  import Breaks from '../components/admin/Breaks.vue'
  import NewMessage from '../components/admin/NewMessage.vue'
  import Messages from '../components/admin/Messages.vue'
  import useAuth from '../composables/useAuth'
  import { onMounted } from 'vue'
  const { userIsAdmin } = useAuth()

  onMounted(() => {document.querySelector("title").innerHTML = "Admin Portal"})
</script>
<template>
  <div v-if="userIsAdmin">
    <h2>Admin Portal</h2>
    <NewBreak/>
    <Breaks/>
    <NewMessage/>
    <Messages/>
  </div>
  <p v-else class="warning_msg">You must be an admin to view this area.</p>
</template>
<style>
.warning_msg, h3 {
  margin: 1rem;
}
</style>