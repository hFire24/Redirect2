<script setup>
  import useRedirected from "../composables/useRedirected"
  const { message, redirectedFromWebsite, website, numTimes, question, rejectId, acceptSomething, rejectSomething } = useRedirected();
</script>

<template>
  <h1>{{ message }}</h1>
  <div v-if="redirectedFromWebsite" class="space">You tried to access {{ website }} {{ numTimes }} time<span v-if="numTimes !== 1">s</span> today.</div>
  <div>{{ question }} <button class="green" @click="acceptSomething">Yes</button><button class="red" @click="rejectSomething" :disabled="rejectId === 11">No</button></div>
</template>
