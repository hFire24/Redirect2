import { ref } from 'vue';
import router from '../router';

export default function useRedirected() {
  const messages = [
    "You were redirected from a blacklisted website.",
    "This website is blocked.",
    "Don't waste time getting distracted on blocked websites."
  ];
    
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

  return { redirectedFromWebsite, website, numTimes, question, rejectId, cirnoMode, acceptSomething, rejectSomething }
}