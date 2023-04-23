<script setup>
  import { onMounted } from "vue";
  import useBreaks from "../composables/useBreaks"
  const { getBreaks, getSmallBreaks, allBreaks, passedBreaks, complete, pass, breakText } = useBreaks();

  onMounted(() => {
    document.querySelector("title").innerHTML = "Take a break."
    const urlSearch = window.location.search;
    const parameter = new URLSearchParams(urlSearch);
    switch(parameter) {
      case "small":
        getSmallBreaks();
        break;
      default:
        getBreaks();
    }
  })
</script>

<template>
  <h1>{{ breakText }}</h1>
  <div>
    <button :disabled="allBreaks.length === 0" @click="complete" class="green">Complete</button>
    <button :disabled="allBreaks.length <= 1 && passedBreaks.length === 0" @click="pass" class="red">Pass</button>
  </div>
</template>
