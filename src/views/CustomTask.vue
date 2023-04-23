<script>
  import router from '../router';

  export default {
    data() {
      return {
        message:"Type in a task, and press \"Submit\" or Enter when done.",
        task:"",
        submitted:false
      }
    },
    methods: {
      submit() {
        if (this.task === "") return
        this.message = this.task
        this.submitted = true
        if(this.message.toLowerCase().indexOf("cirno") >= 0)
          router.push({ name: "home", query: { mode: 'baka' } });
      },
      done() {
        this.message = "Type in a task, and press \"Submit\" or Enter when done.";
        this.submitted = false;
        this.task = "";
      }
    },
    mounted() {
      document.querySelector("title").innerHTML = "Create a task."
    }
  }
</script>

<template>
  <h1>{{ message }}</h1>
  <div v-if="!submitted"><input v-model="task" @keyup.enter="submit"> <button @click="submit" class="green">Submit</button></div>
  <div v-else><button @click="done" class="green">Done</button></div>
</template>
