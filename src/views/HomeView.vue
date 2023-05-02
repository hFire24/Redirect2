<script setup>
  import useRedirected from "../composables/useRedirected"
  import useMessages from "../composables/useMessages";
  import { onMounted } from "vue";
  const { redirectedFromWebsite, website, numTimes, question, rejectId, acceptSomething, rejectSomething, cirnoMode } = useRedirected();
  const { messageText, getMessages } = useMessages();

  onMounted(() => {
    const urlSearch = window.location.search;
    const parameter = new URLSearchParams(urlSearch);
    if(parameter.get('mode') !== null) {
      if(parameter.get('mode').toString() === "baka")
        cirnoMode.value = true;
      else if(parameter.get('mode').toString() === "website")
        redirectedFromWebsite.value = true;
    }
    if(cirnoMode.value) {
      document.querySelector("title").innerHTML = "Baka!"
      messageText.value = `Don't be a ⑨`
      question.value = "Do something else instead!"
      rejectId.value = 9;
    }
    else {
      if (redirectedFromWebsite.value) {
        switch(parameter.get('site').toString()) {
          case "deviantart":
            website.value = "DeviantArt"
            numTimes.value = 1 // This will be replaced by a function to pull from the database.
            break;
          default:
            redirectedFromWebsite.value = false
        }
      }
      document.querySelector("title").innerHTML = "You got redirected!"
      getMessages();
    }
  })
</script>

<template>
  <h1 v-html="messageText"></h1>
  <div v-if="redirectedFromWebsite" class="space">You tried to access {{ website }} {{ numTimes }} time<span v-if="numTimes !== 1">s</span> today.</div>
  <div>{{ question }}<br><button class="green" @click="acceptSomething">Yes</button><button class="red" @click="rejectSomething" :disabled="rejectId === 11">No</button></div>
</template>
