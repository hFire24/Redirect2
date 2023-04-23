<script>
  export default {
    data() {
      return {
        message:"You got 404'd!",
        question:"Got something you need to do?",
        rejectId:1
      }
    },
    methods: {
      rejectSomething() {
        this.rejectId = 2
        this.question = "Don't do nothing. Do something!"
      }
    },
    mounted() {
      document.querySelector("title").innerHTML = "You got 404'd!"
    }
  }
</script>

<template>
  <h1>{{ message }}</h1>
  <div>{{ question }} <button>Yes</button><button @click="rejectSomething">No</button></div>
</template>
