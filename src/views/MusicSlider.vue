<script>
  export default {
    data() {
      return {
        genres:[
          "No Music",
          "Nature Sounds",
          "Ambient Music",
          "Beautiful Piano Music",
          "Downtempo Music",
          "Progressive House",
          "works. Music",
          "Uplifting Trance",
          "Hard Trance",
          "Epic Orchestral Music"
        ],
        genre:"",
        numGenres:0,
        isEpic:false,
        intensity:0,
        category:"Your mind easily wanders off."
      }
    },
    watch: {
      intensity(newIntensity, oldIntensity) {
        let maxIntensity = (this.numGenres - 1).toString();
        if(newIntensity === maxIntensity)
          this.makeItEpic()
        else if(newIntensity < this.numGenres - 1 && oldIntensity === maxIntensity)
          this.calmDown()
        this.genre = this.genres[newIntensity]
        switch(Math.ceil(parseInt(newIntensity) / 2)) {
          case 0:
            this.category = "Your mind easily wanders off."
            break
          case 1:
            this.category = "Lowest intensity"
            break
          case 2:
            this.category = "Low inensity"
            break
          case 3:
            this.category = "Medium intensity"
            break
          case 4:
            this.category = "High intensity"
            break
          case 5:
            this.category = "SUPER HIGH INTENSITY"
            break
        }
      }
    },
    methods: {
      makeItEpic() {
        this.isEpic = true
      },
      calmDown() {
        this.isEpic = false
      }
    },
    mounted() {
      document.querySelector("title").innerHTML = "Music Slider"
      this.genre = this.genres[0]
      this.numGenres = this.genres.length
      document.getElementById("intensity").max = this.numGenres - 1
    }
  }
</script>

<template>
  <h2>This slider will give you some music genres.</h2>
  <div>
    Start with some music from lower intensities to relax.<br>
    If that doesn't help, play some higher intensity music to energize.<br>
    If you're watching something, don't play other music.
  </div>
  <label for="intensity">Intensity: </label><input type="range" id="intensity" v-model="intensity">
  <h1 :class="{ stress: isEpic }">{{ genre }}</h1>
  <div>{{ category }}</div>
</template>

<style>
  .stress {
    color:red;
    font-weight:bold;
    font-style:italic;
  }
</style>