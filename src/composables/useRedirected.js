import { onMounted, ref } from 'vue';
import router from '../router';

export default function useRedirected() {
  const messages = [
    "You were redirected from a blacklisted website.",
    "This website is blocked.",
    "Don't waste time getting distracted on blocked websites."
  ];
    
  const message = ref('')
  const question = ref("Got something you need to do?")
  const rejectId = ref(1)
  const cirnoMode = ref(false)
  const redirectedFromWebsite = ref(false)
  const website = ref('')
  const numTimes = ref(0)
  const bold = ref({fontWeight: "bold"})

  function acceptSomething() {
    switch(rejectId.value) {
      case 1:
      case 10:
        router.push({ name: "custom" })
        break
      case 2:
      case 9:
        router.push({ name: "time"})
        break
      default:
        rejectId.value = 1
        question.value = "Got something you need to do?"
    }
  }

  function rejectSomething() {
    switch(rejectId.value) {
      case 1:
        rejectId.value = 2
        question.value = "Don't do nothing. Do something!"
        break
      case 9:
        rejectId.value = 10
        question.value = "Got something you need to do?"
        break
      case 10:
      default:
        rejectId.value = 11
        question.value = "You really are bored."
    }
  }

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
      message.value = `Don't be a ⑨`
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
      message.value = messages[Math.floor(Math.random() * messages.length)]
    }
  })
  return { message, redirectedFromWebsite, website, numTimes, question, rejectId, acceptSomething, rejectSomething }
}